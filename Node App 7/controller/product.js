const fs = require('fs')

const mongoose = require('mongoose')
const model = require('../Model/product');


const Product = model.Product;


//crud MONGO MONGOOS
exports.createProducts = (req, res) => {

    const product = new Product(req.body) //new instance only create  (body se data lega request body se )   

    // product.title = "PHONEXX";
    // product.price=9999;
    // product.rating=5;   //api me data  beje 

    //save
    product.save()
        .then((doc) => { res.json(doc) })
        .catch((err) => {
            res.json(err);
        });

}

exports.getProducts = async (req, res) => {
    const Productss = await Product.find();
    res.json(Productss)
}


exports.getAllProducts = async (req, res) => {
    const id = req.params.id
    const doc = await Product.findById(id);
    res.json(doc)
}



exports.replace = async (req, res) => {
    const id = req.params.id;
    try {
        const update = await Product.findOneAndReplace({ _id: id }, req.body);
        res.status(201).json(update);
    }
    catch (err) {
        res.json(err)
    }

}


//findoneand replace (filter , replacment,options,callback)  retun query 

exports.updatedproducts = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(201).json(doc);
    }
    catch (err) {
        res.json(err)
    }
}

exports.deleteProducts = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Product.findOneAndDelete({ _id: id });
        res.status(200).json(doc);
    }
    catch (err) {
        console.log(err);
        res.json(err)
    }
}
