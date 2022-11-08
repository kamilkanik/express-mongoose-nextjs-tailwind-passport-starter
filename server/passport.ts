const passport = require("passport");
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");


// Mongoose local strategy passport-local-mongoose
passport.use(User.createStrategy());
// Steam stratagy
passport.use(new SteamStrategy(
    {
        returnURL: 'http://localhost:' + process.env.PORT + '/api/auth/steam/return',
        realm: 'http://localhost:' + process.env.PORT + '/',
        apiKey: process.env.STEAM_API_KEY
    }, 
    function (identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

// passport.serializeUser(User.serializeUser());
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(User.deserializeUser());