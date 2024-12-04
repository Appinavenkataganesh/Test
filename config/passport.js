const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Model/Register'); // Adjust the path as necessary

passport.use(new GoogleStrategy({
  clientID: '360980389026-licn458319rhsi23eopgedav86qt9j32.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/api/auth/google/callback', // Ensure this matches your route
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in the database
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    }

    // If not, create a new user
    user = new User({
      googleId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
    });

    await user.save();
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

// Serialize user instance to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
