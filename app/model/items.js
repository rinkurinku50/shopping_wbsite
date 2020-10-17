const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true, },
    quantity: { type: String, required: true },
    catagory: { type: String, required: true },
    size: {
        type: Object,
        required: true
    }
}, { timestamps: true });

const Items = mongoose.model('Items', itemSchema);
module.exports = Items;