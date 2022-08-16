const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const Profile = require('../models/profile');

// configuring Passport!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ googleId: profile.id });
      if (user) return cb(null, user);
      try {
        const newProfile = await Profile.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        });
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          profileId: newProfile.id,
        });
        // pass the newUser document to passport!
        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (userId, cb) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will
  // be availible in every Single controller function, so you always know the logged in user
  User.findById(userId, function (err, userDocument) {
    if (err) return cb(err);
    cb(null, userDocument);
  });
});
