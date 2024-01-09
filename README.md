// const libe= require('./index')  //import

// console.log(libe.sum(4,5));

// console.log(libe) //{ sum: [Function: sum], diff: [Function: diff] }

// console.log(libe.sum(4,5),libe.diff(5,6));



----------------------------
// function sum (a,b){
//     return a+b

// }

// exports.sum

// function diff(a,b){
//     return a-b;
// }

// exports.sum = sum;

// exports.diff = diff;

// console.log(exports.sum=sum );  //fucnction hai jisme sum hai 



const fs = require('fs')

// const txt =  fs.readFileSync("demo.txt")   //serch root me
// const txt= fs.readFileSync("demo.txt","utf-8")
// console.log(txt );


const txt = fs.readFile("demo.txt", "utf-8", (err, demo) => {
        console.log(demo);
})


//^ upr * ~







//NODE 

const data = require('./data.json')
const http = require('http');


//dynamic routing 

const products= data.products
// console.log(product);

const index = fs.readFileSync('./index.html', "utf-8")

const server = http.createServer((req, res) => {
        // res.end("Hello") //raw
        // res.end("<h1>Hello</h1>")



        // res.setHeader("Dummy","Dummy Value")

        // res.end(data)  isko string 



        //  res.setHeader('content-type',"text/html")
        // res.end(index)  //file 


        //  res.setHeader('content-type','application/json')
        // res.end(JSON.stringify(data))

        //ROUTING 


        switch (req.url) {
                case '/':
                        res.setHeader('content-type', "text/html")
                        res.end(index)  //file  
                        break;
                case '/api':
                        res.setHeader('content-type','application/json')
                        res.end(JSON.stringify(data))
                        break;
                case '/product':

                if (req.url.startsWith('/product')) {
       
                        const id = req.url.split('/')[2]
                        console.log(id);
                        
                    }

                        res.setHeader('content-type', "text/html")
                        const modifiedIndex = index.replace("**title**",products[4].title).replace("**price**",products[4].price).replace("**rating**",products[4].rating).replace("**url**",products[4].thumbnail)
                        res.end(modifiedIndex)

                default :
                        res.writeHead(404)
                        res.end();
                }



})

server.listen(8080)




--------------------------------------------------



const express = require ('express')
// const path = require('path')
const server = express();
const filee= require('./data.json')


//MIDDLEWARE 


// server.use((req,res,next)=>{
//         console.log(
//                 req.method,req.ip,req.hostname,req.get("44"),new Date()
//         );

//         next()
// })



const auth = (req,res,next)=>{

        console.log(req.query);

        if(req.query.password==123){
                next()
        }else{
        res.sendStatus(401);
        }
}

// server.use(auth)


//types of middleware 

// server.use(express.json())
 
// console.log(server.use(express.urlencoded));
// console.log(hello);
 

//Morgan ka use karna hai 
const morgan = require('morgan')
server.use(morgan('dev'))


server.use(express.static('public'))





// server.get('/demo',(req,res)=>{
//         // res.send("hello get");


//         //type of send 

//         // res.send("txt")
//         // res.send("<h1>html</h1>")
//         // res.sendFile( __dirname+'/index.html')
//         // res.json(filee)
//         // res.sendStatus(401)
// })

//AAAAAPPPIIIII

server.get('/',(req,res)=>{
        res.json({Type:"get"})
})

server.get('/product/:id',(req,res)=>{
        console.log(req.params);
        res.json(req.params)
        
})

server.post('/',auth,(req,res)=>{
        res.json({Type:"post"})
})


server.put('/',(req,res)=>{
        res.json({Type:"put"})
})

server.patch('/',(req,res)=>{
        res.json({Type:"patch"})
})

server.delete('/',(req,res)=>{
        res.json({Type:"delete"})
})





server.listen(8080,()=>{
        console.log("server Started");
})



------------------------------------------------------


const express = require ('express')
// const path = require('path')
const server = express();
const data = require('./data.json')
const products= data.products


//GET without id
server.get("/products",(req,res)=>{
        res.json(data)
})
//GET with id
server.get('/products/:id',(req,res)=>{
        const id = +req.params.id
        // console.log(id);  1 http://localhost:8080/products/1

        const product = data.products.find(p=>p.id == id)
        console.log(product);
        res.json(product)
})

//cREATE 

// use a middleware 
server.use(express.json())

//server.use(express.json()) is setting up the server to automatically parse incoming JSON data from client requests, making it easier for the server to handle and process that data.

server.post('/products',(req,res)=>{
        console.log(req.body)  //req.body se body ka data mil jata hai 
        data.products.push(req.body)
        res.json(req.body)
})


//UPDATE 

server.put('/products/:id',(req,res)=>{
        const id = +req.params.id
        const productIndex = products.findIndex(p=>p.id==id)
        console.log(productIndex); 

        products.splice(productIndex,1,{...req.body,id:id})


        //splice: This is a method in JavaScript used to change the contents of an array by removing or replacing existing elements and/or adding new elements.

        //1 how many element you have to remove in this 

        res.json()
})


server.patch('/products/:id',(req,res)=>{
        const id = +req.params.id
        const productIndex = products.findIndex(p=>p.id==id)
        console.log(productIndex); 

        const product = products[productIndex];
        products.splice(productIndex,1,{...product,...req.body,id:id})


        res.status(201).json(product)
})


server.delete('/products/:id',(req,res)=>{
        const id = +req.params.id;

        const product=products.findIndex(p=>p.id==id);

        // const product1 = products[product]

        products.splice(product,1)

        res.json("sussfully...")
})









server.listen(8080,()=>{
        console.log("Srver Started...");
})

-----------------------------------------------------



const express = require ('express')
const server = express();




const ProductRouter = require('./Router/product')



server.use("/products",ProductRouter.route);



server.listen(8080,()=>{
        console.log("Srver Started...");
})




-------------



const express= require('express')

const server = express();

const route= express.Router();

const ProductController = require('../Controller/product')

route
    .get('/',ProductController.getAllData)
    .get('/:id',ProductController.getData)
    .post('/',ProductController.createData)
    .put('/:id',ProductController.overRideData)
    .patch('/:id',ProductController.updateData)
    .delete('/:id',ProductController.deleteData)

exports.route=route;



-----------------

const express = require ('express')
const server = express();




const data = require('../data.json')
const products= data.products;


//GET without id
exports.getAllData =(req,res)=>{
    res.json(data)
}
//GET with id
exports. getData =(req,res)=>{
    const id = +req.params.id
    // console.log(id);  1 http://localhost:8080/products/1

    const product = data.products.find(p=>p.id == id)
    console.log(product);
    res.json(product)
}

//cREATE 

// use a middleware 
server.use(express.json())

//server.use(express.json()) is setting up the server to automatically parse incoming JSON data from client requests, making it easier for the server to handle and process that data.

exports.createData =(req,res)=>{
    console.log(req.body)  //req.body se body ka data mil jata hai 
    data.products.push(req.body)
    res.json(req.body)
}


//UPDATE 

exports.overRideData =(req,res)=>{
    const id = +req.params.id
    const productIndex = products.findIndex(p=>p.id==id)
    console.log(productIndex); 

    products.splice(productIndex,1,{...req.body,id:id})


    //splice: This is a method in JavaScript used to change the contents of an array by removing or replacing existing elements and/or adding new elements.

    //1 how many element you have to remove in this 

    res.json()
}


exports.updateData =(req,res)=>{
    const id = +req.params.id
    const productIndex = products.findIndex(p=>p.id==id)
    console.log(productIndex); 

    const product = products[productIndex];
    products.splice(productIndex,1,{...product,...req.body,id:id})


    res.status(201).json(product)
}


exports.deleteData =(req,res) =>{
    const id = +req.params.id;

    const product=products.findIndex(p=>p.id==id);

    // const product1 = products[product]

    products.splice(product,1)

    res.json("sussfully...")
}







-------------------------------------------------------------
