/*
 routing file for each api module
*/

var router = require('express').Router();
router.use('/products',require('./routers/product.router'));
exports = module.exports = router;
