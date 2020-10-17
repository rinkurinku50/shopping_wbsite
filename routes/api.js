const authController = require('../app/http/controller/apiControllers/authController');
const passport = require('passport');
const authenticateToken = require('../app/http/middleware/authenticateToken');
const productController = require('../app/http/controller/apiControllers/productsContoller');

function apiRoutes(app) {
    app.post('/api/login', authController().postLogin);
    app.post('/api/register', authController().postRegister);
    app.get('/api/items', authenticateToken, authController().itemGet);

    //users products
    app.get('/api/products', authenticateToken, productController().allProducts);
    app.post('/api/products', authenticateToken, productController().findWithCat);

}

module.exports = apiRoutes;