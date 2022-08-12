module.exports = function isLoggedIn(req, res, next) {
  // check if request is from authorized user otherwise redirect to auth page
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
};
