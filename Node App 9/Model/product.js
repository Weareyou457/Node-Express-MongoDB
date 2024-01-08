//schema (Cnfigration)
const mongoose = require('mongoose')
const { Schema } = require("mongoose");

const productSchema = new Schema({
 
    title: {type:String,required : true, unique : true } ,//unique,  
    description: String,
    price: Number,
    discountPercentage: {type: Number, min:[0,'wrong MIN discount'],max:[50,"wrong max dis"]},   //Mixed no ristrinction  
    rating:{type: Number, min:[0,'wrong MIN Rating'],max:[5,"wrong max rate"],default:0},  
    brand:  {type:String,required : true },
    category:  {type:String,required : true },
    thumbnail:String,
    images:[String]  //array of string
  });


//Use of scchema --CONVERTED--> Model(use krke collection bnega)

exports.Product = mongoose.model('Product', productSchema);  //(schema where use khah use hoga isse se pata lage ka collection ka name )
// product name ka collection ka schema ye hai product schema 


//CRUD operation ham model par krenge


