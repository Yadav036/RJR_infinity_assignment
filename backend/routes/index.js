const express = require('express');
// const caRouter = require("./ca");
// const clientRouter = require("./client");
const authRouter = require("./auth");


const router = express.Router();


// router.use("/ca", caRouter);
// router.use("/client", clientRouter);
router.use("/auth",authRouter);


module.exports = router;

