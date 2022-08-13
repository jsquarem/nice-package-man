const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
  res.render('index.ejs');
});

// Google OAuth login route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

//Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/',
  })
);

// router.get('/oauth2callback', function (req, res) {
//   console.log(req, '<-req');
//   passport.authenticate('google', {
//     successReturnToOrRedirect: '/',
//     failureRedirect: '/',
//   });
// });

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});

module.exports = router;
