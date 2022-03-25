const { cookie_name } = require('../config/config');
const jwt = require('../utils/jwt');

module.exports = () => {
    return (req, res, next) => {
        const token = req.cookies[cookie_name] || req.headers[cookie_name];
        try {
            const user = jwt.verify(token);
            req.user = { _id: user._id, email: user.email, role: user.role };
            next();
        } catch (error) {
            error.name == 'JsonWebTokenError' ? next() : next(error);
        }
    };
};