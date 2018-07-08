var controller =  {};
var Product = require("../../models/product");

controller.getAllProducts = async function(req,res){
  let pageNo  =  req.query.page  || 1;
  if(pageNo < 1){
     pageNo=1;
  }
  let limit   =  req.query.limit || 20
  let skip    =  (pageNo-1)*limit;
 
 let countProduct = await Product.find({}).count();
console.log("Number of Product ", countProduct);

  await Product.find({})
         .skip(Number(skip))
         .limit(Number(limit))
         .exec()
         .then(function(products){
                console.log("===products===",products);
                res.status(200).json({products:products, count: countProduct});
           })
         .catch(function(err){
            res.status(400).json({ error: 'something went wrong',err:err});
          })
}
controller.search = function(req,res){

  let searchText = req.query.searchtext;
  Product.find( {"variants.sku":"'"+searchText}).then(function(searchResults){
     
     if(searchResults.length>0)  {
      console.log("search results",searchResults);
      var obj = {
            _id:searchResults[0]._id,
            handle:searchResults[0].handle,
            title:searchResults[0].title,
            variant:{}
          }
     
      for(var i = 0; i < searchResults[0].variants.length; i++){
        if(searchResults[0].variants[i].sku === `'${searchText}`){
          obj.variant = searchResults[0].variants[i];

        }else{
          continue;
        }
      }

       res.status(200).json({searchdata:obj});
   }
   else {
     res.status(500).json({message:"NO content"});
    }
     
   
  }).catch(function(err){
     res.status(500).json({message:"NO content"});
    console.log("error while searching text",err)

  });
 
}
 
 exports = module.exports = controller;
