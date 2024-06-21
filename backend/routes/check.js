const express = require('express');
const authMiddleware = require('../middleware');

const router = express.Router();


router.get('/',authMiddleware, function (req, res) {
    res.json({
        signedIn:true,
    })
})


module.exports= router;