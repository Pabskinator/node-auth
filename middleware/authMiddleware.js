const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check jwt exists and is verified
    if (token) {
        jwt.verify(token, 'cyber droid secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth };