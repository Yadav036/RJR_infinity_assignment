const express = require('express');
const { authMiddleware } = require('../middlewares');
const { Client, Invoice, Compliance } = require('../db');

const router = express.Router();

console.log('📍 Client router loaded');


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const profile = await Client.findOne({ createdBy: req.userId });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/invoices', authMiddleware,  async (req, res) => {
  try {
    const invoices = await Invoice.find({ clientId: req.userId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/reminders', authMiddleware, async (req, res) => {
  try {
    const reminders = await Compliance.find({ clientId: req.userId });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
