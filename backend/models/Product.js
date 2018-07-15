var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    purchaseUnit: {type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseUnit'},
    created: Date
});

mongoose.model('Product', ProductSchema);