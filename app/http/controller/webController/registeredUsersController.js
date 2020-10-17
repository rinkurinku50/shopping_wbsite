const User = require("../../../model/user");
var moment = require('moment');

function registeredUserController() {
    return {
        async index(req, res) {
            const users = await User.find();
            res.render('admin/registeredUser', { users: users, moment: moment });
        }
    }
}

module.exports = registeredUserController;