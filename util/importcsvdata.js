var fs = require('fs');
var csv = require("fast-csv");
var Product = require("../models/product.js");
module.exports = function(options,cb) {
    console.log("=====inside Read=====");
    console.log("filepath",options.filepath);
   let stream= fs.createReadStream(options.filepath);
   var products =  {};
   var count   = 0;
   csv.fromStream(stream, {headers : true})
       .on("data", function(row){
          
            // console.log("each row",row);
            if(products[row.Handle]){
              // console.log("indside if")
              count
              let variant=  {
                  color:row["Option1 Value"],
                  size: row["Option2 Value"],
                  sku: row["Variant SKU"],
                  quantity: row["Variant Inventory Qty"],
                  price: row["Variant Price"],
                  image: row["Image Src"]
              }
              products[row.Handle]['variants'].push(variant);
            }
            else {
        count++;
                // console.log('INSIDE ELSE')
                   // console.log("inside else")
            // console.log('row.handle',row.Handle);
             products[row.Handle]  = {
                  handle :row.Handle,
                  title: row.Title,
                  body: row['Body (HTML)'],
                  vendor: row.Vendor,
                  type: row.Type,
                  tags: row.Tags,
                  published: row.Published,
                  variants:[{
                  color:row["Option1 Value"],
                  size: row["Option2 Value"],
                  sku: row["Variant SKU"],
                  quantity: row["Variant Inventory Qty"],
                  price: row["Variant Price"],
                  image: row["Image Src"]
              }]
              }
            }   // end of else
        })
       .on("end", function(){
           console.log("====file reading done====");
           let finalproducts  =  [];
                for (key in products){
                   if(products.hasOwnProperty(key))
                    finalproducts.push(products[key]);
                }

          Product.create(finalproducts, function(err, documents) {
          if (err){
            console.error(err);
            cb(err);
          } else {
          console.log("Multiple documents inserted to Collection");
          console.log(count);
            cb(null);
          }
          });

        })
        .on('error', function(err) {
          cb(err);
       });
     };
