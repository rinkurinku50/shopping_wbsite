//const LocalPassport = require('passport-local').Strategy;
//const Admin = require('../model/admin');


//function initAdmin(passport) {



//    passport.use('adminAuth', new LocalPassport({
//            usernameField: 'email'
//        },
//        async(email, password, done) => {
//            const admin = await Admin.findOne({ email: email });
//            if (!admin) {
//                return done(null, false, { message: 'No user with this email' });
//            }
//            if (admin.password == password) {
//                return done(null, admin, { message: 'Logged in successfully...' });
//            } else {
//                return done(null, false, { message: 'Wrong  password...' });
//            }
//            //bcrypt.compare(password, user.password).then(match => {
//            //    if (match) {
//            //        return done(null, user, { message: 'Logged in successfully...' });
//            //    }
//            //    return done(null, false, { message: 'Wrong  password...' });
//            //}).catch(err => {
//            //    return done(null, false, { message: 'Something went wrong...' });
//            //});
//        }
//    ));

//    passport.serializeUser((user, done) => {
//        done(null, user._id);
//    });

//    passport.deserializeUser((id, done) => {
//        User.findById(id, (err, user) => {
//            done(err, user)
//        });
//    });
//}


//module.exports = initAdmin;