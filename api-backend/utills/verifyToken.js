const jwt = require("jsonwebtoken")

function isAuthenticated(req, res, next) {
    const token = req.cookies.gamified;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded?.id !== req.params.uid) {
            return res.status(403).json({ msg: "Not authorized" });
        }
        req.user = decoded;
        next();
    });
}



function isAdmin(req, res, next) {
    const token = req.cookies.gamified;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }

        req.user = decoded;
        next();
    })
}

function isAdminOrUser(req, res, next) {
    const token = req.cookies.gamified;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        const role = decoded.role

        if (role !== "user" && role !== 'admin') {
            return res.status(403).json({ message: 'You are not authenticated', role: decoded.role });
        }

        req.user = decoded;
        next();
    })
}

module.exports = { isAdmin, isAuthenticated, isAdminOrUser }