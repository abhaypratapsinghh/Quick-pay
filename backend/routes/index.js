const express = require('express');
const userRouter = require('./user');
const accountRouter = require('./account');
const checkRouter = require('./check');
const router = express.Router();

router.use("/user", userRouter);
router.use("/account",accountRouter);
router.use("/check",checkRouter);

 
module.exports = router;