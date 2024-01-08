const express = require('express');

const userCOntroller = require('../controller/user')  

const router = express.Router()  //express ke 

router
    .post('/', userCOntroller.createProducts)
    .get('/', userCOntroller.getProducts)
    .get('/:id', userCOntroller.getAllProducts)
    .put('/:id', userCOntroller.replace)
    .patch('/:id', userCOntroller.updatedproducts)
    .delete('/:id', userCOntroller.deleteProducts)

exports.routes = router ;