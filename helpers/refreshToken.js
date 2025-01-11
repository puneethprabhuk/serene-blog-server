const jwt = require('jsonwebtoken');

const genereateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
};

module.exports = { genereateRefreshToken }