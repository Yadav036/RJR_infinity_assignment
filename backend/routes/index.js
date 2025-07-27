// backend/routes/index.js
const express = require('express');
const caRouter = require('./ca');           // ✅ must be correct path
const authRouter = require('./auth');
const clientRouter = require('./client');

const router = express.Router();

router.use('/ca', caRouter);                // ✅ mounts /test, /clients, etc
router.use('/auth', authRouter);
router.use('/client', clientRouter);

module.exports = router;
