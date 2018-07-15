var express = require('express');
var router = express.Router();

let productModel = require('../models/Product');
let purchaseUnitModel = require('../models/PurchaseUnit');
let orderLineModel = require('../models/OrderLine');
let orderModel = require('../models/Order');


let mongoose = require('mongoose');
let Product = mongoose.model('Product');
let PurchaseUnit = mongoose.model('PurchaseUnit');
let Order = mongoose.model('Order');
let OrderLine = mongoose.model('OrderLine');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('server works diff');
});

router.get('/API/products/', function (req, res, next) {
  let query = Product.find().populate('purchaseUnit')
  query.exec(function (err, products) {
    if (err) { return next(err); }
    res.json(products);
  });
});

router.post('/API/products/', function (req, res, next) {
  PurchaseUnit.create(req.body.purchaseUnit, function (err, pu) {
    if (err) {
      return next(err);
    }
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      created: req.body.created
    });
    product.purchaseUnit = pu;
    product.save(function (err, prod) {
      if (err) {
        PurchaseUnit.remove({ _id: { $in: product.purchaseUnit } });
        return next(err);
      }
      res.json(prod);
    });
  });

});

router.get('/API/orders/', function(req, res, next) {
  let query = Order.find().populate('orderLines').populate('orderLines.product').populate('orderLines.unit')
  query.exec(function(err, orders) {
    if (err) { return next(err); }
    res.json(orders);
  });
});


router.post('/API/orders/', function (req, res, next) {
  console.log(req.body);
  OrderLine.create(req.body.orderLines, function (err, ol) {
    if (err) {
      return next(err);
    }
    let order = new Order({
      comment: req.body.comment,
      created: req.body.created
    });
    ol.forEach( orderLine => order.orderLines.push(orderLine));

    order.save(function (err, ord) {
      if (err) {
        OrderLine.remove({ _id: { $in: order.orderLines } });
        return next(err);
      }
      res.json(ord);
    });
  });

});


module.exports = router;
