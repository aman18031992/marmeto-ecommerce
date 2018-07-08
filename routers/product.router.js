const router = require("express").Router();
var controller =  require("../api/product/product.controller.js");

router.get("/",controller.getAllProducts);
router.get("/search",controller.search);

exports=module.exports = router;
