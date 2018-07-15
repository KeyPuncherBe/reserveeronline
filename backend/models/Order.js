var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    orderLines: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderLine'}],
    orderTotalPrice: Number,
    comment: String,
    created: Date
});

mongoose.model('Order', OrderSchema);