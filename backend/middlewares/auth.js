const { getUser } = require('../service/auth');

const restictToLoggedInUserOnly = (req, res, next) => {
  const sessionId = req.cookies.uid;
  if (!sessionId) {
    if (req.path.startsWith('/user') || req.path.startsWith('/product') || req.path.startsWith('/wishlist')) {
      return res.status(401).json({ msg: "Not authenticated" });
    }
    return res.redirect('/login');
  }
  
  const user = getUser(sessionId);
  if (!user) {
    if (req.path.startsWith('/user') || req.path.startsWith('/product') || req.path.startsWith('/wishlist')) {
      return res.status(401).json({ msg: "Session expired" });
    }
    return res.redirect('/login');
  }
  
  req.user = user;
  next();
};

module.exports = {
  restictToLoggedInUserOnly
};