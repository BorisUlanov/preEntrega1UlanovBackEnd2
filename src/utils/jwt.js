import jwt from 'jsonwebtoken';

module.exports = {
  generateToken: (payload) =>
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' }),
  verifyToken: (token) => jwt.verify(token, process.env.SECRET_KEY),
};