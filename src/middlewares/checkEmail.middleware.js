import User from '../dao/mongo/user.dao.js';

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.getByEmail(email);
  if (user) {
    return res.status(400).json({ message: 'El email ya está registrado' });
  }
  next();
};