var GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../models/user');
const clientId = require('../config/gauthConfig').clientId;
const clientSecret = require('../config/gauthConfig').clientSecret;
const passport = require('passport');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:8000/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // console.log(profile.photos.value);
        // console.log(profile.photos[0].value);

        user.findOne({ email: profile.emails[0].value }).then((data) => {
            if (data) {
                return done(null, data);
            } else {
                user({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    pic: profile.photos[0].value
                }).save(function (err, data) {
                    return done(null, data);
                });
            }
        });
    }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        done(null,user);
        // user.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });

}