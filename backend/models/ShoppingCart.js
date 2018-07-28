var mongoose = require('mongoose');

var ShoppingCartSchema = new mongoose.Schema({
    items: [new mongoose.Schema(
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            amount: Number
        })],
    comment: String,
    created: Date
});

mongoose.model('ShoppingCart', ShoppingCartSchema);