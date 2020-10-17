const Items = require("../../../model/items");
var moment = require('moment');

function showItemsController() {

    return {
        async index(req, res) {
            const items = await Items.find();
            res.render('admin/showAllItems', { items: items, moment: moment });
        }

    }

}

module.exports = showItemsController;