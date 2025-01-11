const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if(error) {
                return res.status(403).json({ message: "Forbidden request" });
            }

            req.id = user.id;
            req.email = user.email;

            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = { verifyToken };