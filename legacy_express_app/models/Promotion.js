const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Retail',
        'Food & Restaurant',
        'Real Estate',
        'Events',
        'Services',
        'Education',
        'Healthcare',
        'Other',
      ],
    },
    promotionType: {
      type: String,
      required: true,
      enum: [
        'Instagram Story',
        'Instagram Post',
        'Instagram Reel',
        'Story + Post Bundle',
      ],
    },
    budget: {
      type: String,
      required: true,
      enum: ['₹500–₹1000', '₹1000–₹2500', '₹2500–₹5000', '₹5000+'],
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    referralSource: {
      type: String,
      required: true,
      enum: ['Instagram', 'Friend/Word of mouth', 'Google', 'Other'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Promotion', promotionSchema);
