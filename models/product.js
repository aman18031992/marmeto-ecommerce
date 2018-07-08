var mongoose = require('mongoose');
var product = new mongoose.Schema({
"handle": String,
"title": String,
"body": String,
"vendor": String,
"type": String,
"tags": String,
"published": Boolean,
"variants":{ type : Array , "default" : [] }
});

//product.index({variants: 'text'});

exports = module.exports = mongoose.model('Product',product);
