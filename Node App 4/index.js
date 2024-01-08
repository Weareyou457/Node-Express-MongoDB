const fs=require('fs')

const index = fs.readFileSync('index.html','utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const products = data.products;


const express = require('express');


const server = express();   //create server


server.use(express.json())

// API - Endpoint (resver yaha band ho jyega or Route bhi hai )


//products 


//API ROOT , bASEURL , goggle.com/api/v2 base url hai uske baad products ayega 




//CREATE POST API 

// (new data product add) post url body json me ek product 

// aarha hai 

// put json 

server.post('/products',(req,res)=>{ 
    console.log(req.body);
    products.push(req.body)
    res.json(req.body)  //confirmation to client 
})






///READ   GET   POST API 

// Read GET / Products 
server.get('/products',(req,res)=>{     // product name ka rsources milega   
    res.json(data)
})

//url varuable id ke jesa 
server.get('/products/:id',(req,res)=>{ 
        // console.log(req.params); //catch { id: '2' }
        const id = +req.params.id //save kart lete hai id string dega number me karo + laga kar 

       const product = products.find(p=>p.id===id)
    res.json(product)
})






// UPDATE / PUT API 
//  update ye jo product me ab me naya data de raha hu 

//put me data override hota hai 
server.put('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id ===id)
    //purane ko naya 
    // find copy de rha hai 
    products.splice(productIndex,1,{...req.body,id:id})  //ek obj bnana hai jisme request . body ke ssare elemts ayenge spred or id add hojyega  (override karta hai data)

    res.status(201).json();
})

// no overide change 

server.patch('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id ===id)
    //purane ko naya 
    // find copy de rha hai 

    // old products 

    const product = products[productIndex]
    products.splice(productIndex,1,{...product,...req.body,id:id})  //ek obj bnana hai jisme request . body ke ssare elemts or uske phele sab aayenge ayenge spred or id add hojyega  (override karta hai data)

    res.status(201).json();
})


//DELTE delete API 

server.delete('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id ===id)
    //product ki index nikl lenge
    
    const product = products[productIndex] // delete krne se phele product nikl liya 

    products.splice(productIndex,1)  //delete kr dega product index 

    res.status(201).json(product);
})








server.listen(8080,()=>{  //call back
    console.log("server started");  //serveer started 
});