const adminAuthController = require('../app/http/controller/webController/adminAuthController');
const itemAddController = require('../app/http/controller/webController/itemAddController');
const itemShowController = require('../app/http/controller/webController/showItemsCrontoller');
const registeredUserController = require('../app/http/controller/webController/registeredUsersController');
const authCheck = require('../app/http/middleware/authCheck');
const routeSecure = require('../app/http/middleware/makeRouteSecure');

function initRoute(app) {
    //login route
    app.get('/', authCheck, adminAuthController().index);
    app.post('/', authCheck, adminAuthController().adminLogin);
    //logout route
    app.post('/logout', adminAuthController().logout);

    app.get('/home', routeSecure, itemShowController().index);
    // for items
    app.get('/itemAdd', routeSecure, itemAddController().index);
    app.post('/itemAdd', routeSecure, itemAddController().itemPost);

    //register user by api
    app.get('/users', routeSecure, registeredUserController().index);


}


module.exports = initRoute;