module.exports = function isLoggedIn(req, res, next) {
  // check if request is from authorized user otherwise redirect to auth page
  if (req.isAuthenticated()) return next();
  //req.session.redirectTo = req.url;
  res.redirect('/auth/google');
};
