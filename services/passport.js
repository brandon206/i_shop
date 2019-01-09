const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const { users } = require('../db/models');
const { secret } = require('../config').jwtConfig;


// local login is just email and password or username and password
const localOptions = {
    usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        email = email.toLowerCase();

        const user = await users.findOne({ where: { email } });

        if(!user){
            return done(null, false);
        }

        const isMatch = await user.comparePasswords(password);

        if(!isMatch){
            return done(null, false);
        }

        done(null, user);

    }catch(err) {
        done(err);
    }
});

passport.use(localLogin);