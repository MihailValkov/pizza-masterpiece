const { cookie_name } = require('../config/config');
const jwt = require('../utils/jwt');

module.exports = () => {
    return (req, res, next) => {
        const token = req.cookies[cookie_name] || req.headers[cookie_name];
        try {
            const data = jwt.verify(token);
            req.user = { _id: data._id, email: data.email, role: data.role };
            next();
        } catch (error) {
            error.name == 'JsonWebTokenError' ? next() : next(error);
        }
    };
};