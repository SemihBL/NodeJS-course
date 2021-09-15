"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

router.get('/', function (req, res, next) {
  var products = [{
    name: "iPhone 12",
    price: 11000,
    image: "4.jpg",
    description: "Perfect"
  }, {
    name: "iPhone 11",
    price: 8000,
    image: "6.png",
    description: "Successful"
  }, {
    name: "iPhone X",
    price: 9000,
    image: "5.jpg",
    description: "Nice"
  }];
  res.render('./index', {
    title: "Homepage",
    products: products
  }); // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
});
module.exports = [router];