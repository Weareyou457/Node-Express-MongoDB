require('dotenv').config()

const express = require('express');
const server = express();   //create server

///cors (parallel do server) use as a middleware
const cors = require('cors')


//db Conection

const mongoose = require('mongoose');
//mongoose 
const { Schema } = mongoose; 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("dataBase Connected");
}

//baki ka udhr




const productRouter = require('./routes/product')


//use like a middle ware

server.use(cors())


server.use(express.json())
server.use(express.static(process.env.PUBLIC_DIR)) ///---NEW---
server.use('/products',productRouter.routes)  


console.log('env',process.env.DB_PASSWORD) 



 //FRONTEND KI ROUTING  (kuch nhi mila) wild card process 
 server.use('*',(req,res)=>{
  res.sendFile(__dirname+'/build/index.html') //dir
 }) //koi bhi path match hoga



server.listen(process.env.PORT, () => {  //call back
    console.log("server started");  //serveer started 
});