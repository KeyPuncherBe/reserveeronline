var express = require('express');
var router = express.Router();

let productModel = require('../models/Product');
let purchaseUnitModel = require('../models/PurchaseUnit');
let orderLineModel = require('../models/OrderLine');
let orderModel = require('../models/Order');
let userModel = require('../models/User');
// let shoppingCartModel = require('../models/ShoppingCart');


let mongoose = require('mongoose');
let Product = mongoose.model('Product');
let PurchaseUnit = mongoose.model('PurchaseUnit');
let Order = mongoose.model('Order');
let OrderLine = mongoose.model('OrderLine');
let User = mongoose.model('User');
// let ShoppingCart = mongoose.model('ShoppingCart');

let jwt = require('express-jwt');
let auth = jwt({secret: process.env.RO_BACKEND_SECRET});
let passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('server works diff');
});

router.get('/API/products/', function (req, res, next) {
  let query = Product.find()
  query.exec(function (err, products) {
    if (err) { return next(err); }
    res.json(products);
  });
});


router.post('/API/products/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  console.log('Inside post request. Req.user:');
  console.log(req.user);
  if(req.user && req.user.role && req.user.role !== 'admin') {
    console.log('user is user')
    res.status(401);
    res.send();
  } else {
    console.log('trying to create product');
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      purchaseUnit: req.body.purchaseUnit,
      stackable: req.body.stackable,
      allowDecimal: req.body.allowDecimal,
      created: req.body.created
    });

    product.save(function (err, prod) {
      if (err) {
        PurchaseUnit.remove({ _id: { $in: product.purchaseUnit } });
        return next(err);
      }
      res.json(prod);
    });
  }
});

router.get('/API/orders/', function(req, res, next) {
  let query = Order.find().populate('orderLines').populate('orderLines.product').populate('orderLines.unit')
  query.exec(function(err, orders) {
    if (err) { return next(err); }
    res.json(orders);
  });
});

router.get('/API/shoppingCart/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  console.log('inside get');
  if(req.user.shoppingCart){
    console.log(req.user.shoppingCart);
    res.json(req.user.shoppingCart);
  }
  else {
    
  }
  
  
});

router.post('/API/shoppingCart/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  console.log('inside post');
  console.log(req.body);
  req.user.shoppingCart = req.body;
  console.log(req.user.shoppingCart);
  req.user.save(function (err, user) {
    if(err) {
      console.log('error saving shopping cart');
      return next(err);
    }
    console.log('cart:');
    console.log(user.shoppingCart)
    res.json(user.shoppingCart);
  })
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
