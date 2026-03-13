const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authentication required. Please log in." });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authentication required. Invalid token format." });
        }

        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedPayload;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(403).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = { verifyToken };
