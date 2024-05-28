const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')

passport.use(
  new GoogleStrategy(

    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },

    function (req, accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})


passport.deserializeUser(async function (user, cb) {
  cb(null, user)
})
