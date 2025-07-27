const express = require('express');
const { authMiddleware } = require('../middlewares');
const { Client, Invoice, Compliance } = require('../db');

console.log('📍 CA router loaded');

const router = express.Router();

// Add this at the top of your routes in ca.js
router.get('/test', (req, res) => {
  console.log('🧪 Test route hit');
  res.json({ message: 'CA routes are working!', timestamp: new Date() });
});
// ------- Client Routes -------
router.get('/clients', authMiddleware, async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.userId });
    res.json(clients);
  } catch (err) {
    console.error("❌ Error fetching clients:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.post('/clients', authMiddleware, async (req, res) => {
  console.log("🔽 Received POST to /clients");
  console.log("📦 Body:", req.body);
  console.log("🪪 userId:", req.userId);
  console.log("🔥 Received POST with userId:", req.userId);


  try {
    const client = await Client.create({
      ...req.body,
      createdBy: req.userId
    });
    console.log("✅ Client Created:", client);
    res.status(201).json(client);
  } catch (err) {
    console.error("❌ Error creating client:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.put('/clients/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Client.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'Client not found' });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating client:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.delete('/clients/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Client.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });
    if (!deleted) return res.status(404).json({ msg: 'Client not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error("❌ Error deleting client:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

// ------- Invoice Routes -------
router.get('/invoices', authMiddleware, async (req, res) => {
  try {
    const invoices = await Invoice.find({ createdBy: req.userId }).populate('clientId');
    res.json(invoices);
  } catch (err) {
    console.error("❌ Error fetching invoices:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.post('/invoices', authMiddleware, async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      createdBy: req.userId
    });
    res.status(201).json(invoice);
  } catch (err) {
    console.error("❌ Error creating invoice:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.put('/invoices/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Invoice.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'Invoice not found' });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating invoice:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.delete('/invoices/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Invoice.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });
    if (!deleted) return res.status(404).json({ msg: 'Invoice not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error("❌ Error deleting invoice:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

// ------- Compliance Reminder Routes -------
router.get('/reminders', authMiddleware, async (req, res) => {
  try {
    const reminders = await Compliance.find({ createdBy: req.userId }).populate('clientId');
    res.json(reminders);
  } catch (err) {
    console.error("❌ Error fetching reminders:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

router.post('/reminders', authMiddleware, async (req, res) => {
  try {
    const reminder = await Compliance.create({
      ...req.body,
      createdBy: req.userId
    });
    res.status(201).json(reminder);
  } catch (err) {
    console.error("❌ Error creating reminder:", err.message);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

module.exports = router;