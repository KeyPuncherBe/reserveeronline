var express = require('express');
var router = express.Router();

let productModel = require('../models/Product');
let purchaseUnitModel = require('../models/PurchaseUnit');

let mongoose = require('mongoose');
let Product = mongoose.model('Product');
let PurchaseUnit = mongoose.model('PurchaseUnit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server works diff');
});

router.get('/API/products/', function(req, res, next) {
  let query = Product.find().populate('purchaseUnit')
  query.exec(function(err, products) {
    if (err) { return next(err); }
    res.json(products);
  });
});

router.post('/API/products/', function (req, res, next) {
  PurchaseUnit.create(req.body.purchaseUnit, function(err, pu){
    if (err){
      return next(err);
    }
    let product = new Product({name: req.body.name, 
      description: req.body.description,
      created: req.body.created});
      product.purchaseUnit = pu;
    product.save(function(err, prod) {
      if (err){ 
        PurchaseUnit.remove({ _id: {$in: product.purchaseUnit}});
        return next(err); }
      res.json(prod);
    });
  });
  
});    

module.exports = router;
