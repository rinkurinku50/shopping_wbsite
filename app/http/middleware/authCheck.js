function authCheck(req, res, next) {

    if (!req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/itemAdd');

}

module.exports = authCheck;