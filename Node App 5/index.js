
const express = require('express');
const server = express();   //create server
server.use(express.json())
// const prooductCOntroller = require('./controller/product')  //dusri file 

//router 
// const productRouter = express.Router()  //express ke andhr route hota hai  //dusri file 

const productRouter = require('./routes/product')
const userRouter = require('./routes/user')

server.use('/products',productRouter.routes)  //iisse ab server api path par ye wala route laga dega 
server.use('/user',userRouter.routes)  //iisse ab server api path par ye wala route laga dega 




// ab iska puraa path hogya hai 

// localhost/api/v1/products


// file 





//MVC MODEL VIEW CONTROLLER (reuseability)

// server ke upr ham product set kar rha hu to ham router me bhi set kar skte hai

// server.post('/products', prooductCOntroller.createProducts)
// server.get('/products', prooductCOntroller.getProducts)
// server.get('/products/:id', prooductCOntroller.getAllProducts)
// server.put('/products/:id', prooductCOntroller.replace)
// server.patch('/products/:id', prooductCOntroller.updatedproducts)
// server.delete('/products/:id', prooductCOntroller.deleteProducts)

//ek shortcut 


// model view controller 

//isme koi bhi application likhi jati //data me kya kya filled honge 

//bussineess role price itna hi ho skta rating  MODEL data se rule nikl kar aate hai

//view data ko show karna //node se template me data karna 

//controller  MODEL or VIEW ke bich me jo bhi logic interchange ho rhe hai data khah se khah jayega view me kya change hone jisse model aafect hoga 

// har chiz ko ham teen 3 part me divide krne MODEL VIEW CONTROLLER 

//model :-  data or uske rule

//view :- frontend temp me data show 

//controller ko controll folder me rakh diya 





server.listen(8080, () => {  //call back
    console.log("server started");  //serveer started 
});