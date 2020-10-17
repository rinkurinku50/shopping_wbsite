const LocalPassport = require('passport-local').Strategy;
//const bcrypt = require('bcrypt');
const Admin = require('../model/admin');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


function init(passport) {
    var options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret123'
    };


    passport.use(new LocalPassport({
            usernameField: 'email'
        },
        async(email, password, done) => {
            const admin = await Admin.findOne({ email: email });
            if (!admin) {
                return done(null, false, { message: 'No user with this email' });
            }
            if (admin.password == password) {
                return done(null, admin, { message: 'Logged in successfully...' });
            } else {
                return done(null, false, { message: 'Wrong  password...' });
            }
            //bcrypt.compare(password, user.password).then(match => {
            //    if (match) {
            //        return done(null, user, { message: 'Logged in successfully...' });
            //    }
            //    return done(null, false, { message: 'Wrong  password...' });
            //}).catch(err => {
            //    return done(null, false, { message: 'Something went wrong...' });
            //});
        }
    ));

    passport.use(new JwtStrategy(options, async(jwtPayload, done) => {
        const em = jwtPayload.email;
        User.findOne({ email: em }, (err, user) => {
            if (err) {
                return done(err, false);
            } else {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }

        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        Admin.findById(id, (err, user) => {
            done(err, user)
        });
    });
}





module.exports = init;