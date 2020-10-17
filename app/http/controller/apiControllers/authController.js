const User = require("../../../model/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwtToken = require("jsonwebtoken");

function authController() {
    return {

        async postLogin(req, res) {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(401).send({
                    success: false,
                    errro: "all fields required",
                });
            }
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).send({
                    error: 'No user with this email'
                });
            }

            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    const payload = {
                        email: user.email
                    }
                    const options = {
                        subject: `${user._id}`,
                        expiresIn: 3600
                    }
                    const token = jwtToken.sign(payload, 'secret123', options);
                    return res.send({
                        output: {
                            success: 'Logged in successfully...',
                            token
                        }
                    });
                } else {
                    return res.status(401).send({
                        error: 'Wrong  password...',
                    });
                }
            }).catch(err => {
                return res.status(401).send({
                    error: 'Something went wrong...',
                });
            });

            //passport.authenticate("userAuth", (err, user, info) => {
            //    if (err) {
            //        return res.status(401).send({
            //            error: info.message,
            //        });
            //        //return next(err);
            //    }
            //    if (!user) {
            //        return res.status(401).send({
            //            error: info.message,
            //        });
            //    }
            //    req.logIn(user, (err) => {
            //        if (err) {
            //            return res.status(401).send({
            //                error: info.message,
            //            });
            //        }
            //        const payload = {
            //            email: user.email
            //        }
            //        const options = {
            //            subject: `${user._id}`,
            //            expiresIn: 3600
            //        }
            //        const token = jwtToken.sign(payload, 'secret123', options);
            //        return res.send({
            //            success: info.message,
            //            token
            //        });
            //    });
            //})(req, res);

        },
        async postRegister(req, res) {
            const { name, last, email, password } = req.body;
            if (!name || !last || !email || !password) {
                return res.status(401).send({
                    errro: "all fields required",
                });
            }
            //convert to hash password
            const hashPass = await bcrypt.hash(password, 10);
            //check email is exist
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    return res.status(401).send({
                        email: "this email already exist....",
                    });
                }
            });

            //create new user
            const user = new User({
                name,
                last,
                email,
                password: hashPass,
            });
            user
                .save()
                .then((user) => {
                    return res.send({
                        pass: "done",
                        value: user,
                    });
                })
                .catch((err) => {
                    return res.status(401).send({
                        error: err,
                    });
                });
        },
        itemGet(req, res) {
            res.send({
                message: 'verify data...'
            });
        }
    };
}

module.exports = authController;