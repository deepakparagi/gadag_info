const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Promotion = require('../models/Promotion');
const { sendPromotionNotification } = require('../utils/mailer');

const router = express.Router();

/* ─── Fallback: save to local JSON when no DB ─── */
const FALLBACK_PATH = path.join(__dirname, '..', 'data', 'promotions.json');

function saveFallback(data) {
  const dir = path.dirname(FALLBACK_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let existing = [];
  if (fs.existsSync(FALLBACK_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(FALLBACK_PATH, 'utf-8'));
    } catch {
      existing = [];
    }
  }
  existing.push({ ...data, createdAt: new Date().toISOString() });
  fs.writeFileSync(FALLBACK_PATH, JSON.stringify(existing, null, 2), 'utf-8');
}

/* ─── Validation Rules ─── */
const validationRules = [
  body('businessName')
    .trim()
    .notEmpty()
    .withMessage('Business name is required')
    .isLength({ max: 120 })
    .withMessage('Business name must be under 120 characters'),

  body('ownerName')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be under 100 characters'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[0-9\s\-]{7,15}$/)
    .withMessage('Enter a valid phone number'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('category')
    .notEmpty()
    .withMessage('Select a business category')
    .isIn([
      'Retail',
      'Food & Restaurant',
      'Real Estate',
      'Events',
      'Services',
      'Education',
      'Healthcare',
      'Other',
    ])
    .withMessage('Invalid category'),

  body('promotionType')
    .notEmpty()
    .withMessage('Select a promotion type')
    .isIn([
      'Instagram Story',
      'Instagram Post',
      'Instagram Reel',
      'Story + Post Bundle',
    ])
    .withMessage('Invalid promotion type'),

  body('budget')
    .notEmpty()
    .withMessage('Select a budget range')
    .isIn(['₹500–₹1000', '₹1000–₹2500', '₹2500–₹5000', '₹5000+'])
    .withMessage('Invalid budget range'),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must be under 1000 characters'),

  body('referralSource')
    .notEmpty()
    .withMessage('Let us know how you found us')
    .isIn(['Instagram', 'Friend/Word of mouth', 'Google', 'Other'])
    .withMessage('Invalid referral source'),
];

/* ─── POST /api/promote ─── */
router.post('/', validationRules, async (req, res) => {
  /* Validate */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = {};
    errors.array().forEach((err) => {
      if (!fieldErrors[err.path]) {
        fieldErrors[err.path] = err.msg;
      }
    });
    return res.status(422).json({ success: false, errors: fieldErrors });
  }

  const formData = {
    businessName: req.body.businessName,
    ownerName: req.body.ownerName,
    phone: req.body.phone,
    email: req.body.email,
    category: req.body.category,
    promotionType: req.body.promotionType,
    budget: req.body.budget,
    message: req.body.message || '',
    referralSource: req.body.referralSource,
  };

  try {
    /* Save to database or fallback */
    if (mongoose.connection.readyState === 1) {
      await Promotion.create(formData);
    } else {
      saveFallback(formData);
    }

    /* Send email notification (non-blocking — don't let email failure break the response) */
    sendPromotionNotification(formData).catch((err) => {
      console.error('Email send failed:', err.message);
    });

    return res.status(200).json({
      success: true,
      message: "We'll be in touch within 24 hours!",
    });
  } catch (err) {
    console.error('Promotion save error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
});

module.exports = router;
