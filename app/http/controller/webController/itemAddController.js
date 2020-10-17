const Items = require("../../../model/items");

function addAdminController() {
    return {
        index(req, res) {
            console.log(req.user);
            return res.render('admin/itemAdd');
        },
        itemPost(req, res) {
            //console.log(req.body.name);
            const items = new Items({
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                quantity: req.body.quantity,
                catagory: req.body.catagory,
                size: req.body.size
            });

            items.save().then(result => {
                console.log("Add...");
                res.json({ success: 'true' });
            }).catch(err => {
                console.log(err);
                res.json({ error: err });
            });

        }

    }
}

module.exports = addAdminController;