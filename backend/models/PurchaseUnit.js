var mongoose = require('mongoose');

var PurchaseUnitSchema = new mongoose.Schema({
    unit: String,
    price: Number,
    allowDecimal: Boolean,
    stackable: Boolean,
    created: Date
});

PurchaseUnitSchema.pre('remove', function (next) {
    this.model('Product').update({}, 
      { $pull: { purchaseUnit: this._id } }, 
      { safe: true, multi: true }, next);
  })

mongoose.model('PurchaseUnit', PurchaseUnitSchema);