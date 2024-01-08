const express = require('express');

const prooductCOntroller = require('../controller/product')  

const router = express.Router()  //express ke 

router
    .post('/', prooductCOntroller.createProducts)
    .get('/', prooductCOntroller.getProducts)
    .get('/:id', prooductCOntroller.getAllProducts)
    .put('/:id', prooductCOntroller.replace)
    .patch('/:id', prooductCOntroller.updatedproducts)
    .delete('/:id', prooductCOntroller.deleteProducts)

exports.routes = router ;