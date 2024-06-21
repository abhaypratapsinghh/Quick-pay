const express = require('express');
const mongoose = require('mongoose');

const { User, Account } = require('../db');
const authMiddleware = require('../middleware');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    if (!account) {
        return res.json({
          signedIn: false,
          message: "account not found",
        });
    }

    res.json({
        balance: account.balance,
        signedIn:true,
    })
});

router.post('/transfer', authMiddleware, async (req, res) => {
    
    const session = await mongoose.startSession();
    

    session.startTransaction();


    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session);
    const toAccount = await Account.findOne({
        userId: req.body.to
    }).session(session);

    const amount = req.body.amount;

    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.json({
            message: "insufficient balance"
        })
    }

    if (!toAccount) {
        session.abortTransaction();
        return res.json({
            message: "there is no receiving account",
        })
    }

    await Account.updateOne({
        userId: fromAccount.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId: toAccount.userId
    }, {
        $inc: {
            balance: amount
        }
    }).session(session)

    await session.commitTransaction();

    res.json({
        message: "transaction successfull"
    })
});

module.exports = router;

