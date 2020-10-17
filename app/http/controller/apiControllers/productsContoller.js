const Items = require("../../../model/items")

function productsController() {

    return {
        async allProducts(req, res) {
            var products = await Items.find()
            res.send({
                output: {
                    products
                }
            });
        },
        findWithCat(req, res) {
            var cat = req.body.catagory;
            console.log(cat);
        }
    }

}

module.exports = productsController;