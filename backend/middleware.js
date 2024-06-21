const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { 

    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith('Bearer ')) {
        return res.json({
            signedIn: false,
        });
    } 

    const token = authheader.split(' ')[1];
    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.userId = user.userId;
        next();
    }
    catch (err) { 
        return res.json({
          signedIn: false,
          message: err.message,
        });
    }
}



module.exports = authMiddleware;