require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const promoteRoute = require('./routes/promote');

const app = express();
const PORT = process.env.PORT || 3000;

/* ─── View Engine ─── */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ─── Middleware ─── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* ─── Routes ─── */
app.get('/', (_req, res) => {
  res.render('index');
});

app.use('/api/promote', promoteRoute);

/* ─── MongoDB Connection (graceful fallback) ─── */
const MONGO_URI = process.env.MONGO_URI;
let dbConnected = false;

if (MONGO_URI && MONGO_URI !== 'mongodb://localhost:27017/gadag_info') {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      dbConnected = true;
      console.log('✅ MongoDB connected');
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB connection failed — running without database');
      console.warn(`   Reason: ${err.message}`);
    });
} else {
  console.warn('⚠️  No MONGO_URI configured — running without database');
  console.warn('   Form submissions will be saved to local JSON fallback');
}

/* ─── Expose DB status to routes ─── */
app.use((_req, res, next) => {
  res.locals.dbConnected = dbConnected;
  next();
});

/* ─── 404 ─── */
app.use((_req, res) => {
  res.status(404).render('index');
});

/* ─── Global Error Handler ─── */
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

/* ─── Start ─── */
app.listen(PORT, () => {
  console.log(`\n🚀 Gadag Info running at http://localhost:${PORT}\n`);
});
