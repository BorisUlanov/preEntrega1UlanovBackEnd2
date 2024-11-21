module.exports = (req) => {
    const token = req.cookies?.authToken;
    if (!token) {
      return null;
    }
    return token;
  };