var mongoose = require('mongoose');

var OrderLineSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    unit:{type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseUnit'},
    quantity: {type: Number, required: true},
    totalPrice: Number,
    comment: String,
    created: Date
});

mongoose.model('OrderLine', OrderLineSchema);