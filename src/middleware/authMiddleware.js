const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the "Bearer" scheme
    if (!token) return res.status(401).json({ message: "Authentication required" });

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid or expired token" });

        // Set the user on the request object
        req.user = user;
        next();
    });
}

module.exports = verifyToken;
