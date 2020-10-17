const passport = require("passport");

function adminAuthController() {
    return {
        index(req, res) {
            res.render('home');
        },
        adminLogin(req, res, next) {
            const { email, password } = req.body;

            if (!email || !password) {
                req.flash('error', 'All Fields are required...');
                req.flash('email', email);
                return res.redirect('/');
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/');
                }

                req.logIn(user, (err) => {
                    if (err) {

                        req.flash('error', info.message);
                        return next(err);
                    }
                    return res.redirect('/itemAdd');
                })

            })(req, res, next);

            //console.log(email);
        },
        logout(req, res) {
            req.logout();
            return res.redirect('/');
        }

    }
}

module.exports = adminAuthController;