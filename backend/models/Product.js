var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    purchaseUnit: String,
    price: Number,
    allowDecimal: Boolean,
    stackable: Boolean,
    created: Date
});

mongoose.model('Product', ProductSchema);