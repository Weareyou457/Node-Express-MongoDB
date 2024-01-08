const fs=require('fs')

const index = fs.readFileSync('index.html','utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const express = require('express')

const server = express();   //create server

// MIDDLEWARE HOTA HAI LIKE BICH WALA PERSON pehele req middle ware htoa hai or middleware server par bhi hota hai 

// excute any code 
// call next middle ware 
// authenticationz




server.use(express.static('public'))  //staic web hosting make public folder like naming convension bej skte hai staic variable (stac josing )  57 line


server.use((req,res,next)=>{
    console.log(req.method,req.ip , req.hostname
        ,req.get("uu") ,new Date()); //konsa method hai khali atak gya 
    next() //ab ye aage bhej dega 

    // logger type 
})  //custom middleware


// TYPES OF MIDDLE WARE 

// 1. application level middleware upr wala
// 2. route level middleware 


const auth= (req,res,next)=>{
    console.log(req.query);
    if(req.query.password == '123'){
        //query ? krke qury likh skte ho url me 
        next()
    }else{
        res.sendStatus(404);
    }
}

// server.use(auth) //pure pr laga do
// http://localhost:8080/?password=123




// 3. error halding middleware for error handling 

// 4. built in middleware 

//body parser expres.json ek middle ware 
server.use(express.json())
// server.use(express.urlencoded())  //url incoded data 



// 5. THird Party Middleware (bbhut sare hai Me morgan )
// npm i morgan 
const morgan =require('morgan')

server.use(morgan('dev'))

// URL DEGA 
//GET /**url** 404 12.801 ms - 146
// GET /index.js 404 8.122 ms - 147
// GET /**url** 404 1.397 ms - 146





//Parameter get kar skt hai 
server.get('/product/:id',(req,res)=>{      // :/id --> url params 

    console.log(req.params);
    res.json({type:'GET'})
})

//{ id: '5' }
// { id: '5an' }









// API - Endpoint (resver yaha band ho jyega or Route bhi hai )
server.get('/',(req,res)=>{      //ek hi excute hoga 
    res.json({type:'GET'})
})

server.post('/',auth,(req,res)=>{     //ispr laga hai middle ware
    res.json({type:'POST'})
})

server.put('/',(req,res)=>{ 
    res.json({type:'PUT'})
})

server.delete('/',(req,res)=>{ 
    res.json({type:'DELETE'})
})

server.patch('/',(req,res)=>{ 
    res.json({type:'PATCH'})
})
















server.get('/demo',(req,res)=>{    //get type ka hoga (path,call back function)

    // RESPONSE BHEJNE KE TARIKE

    // res.send('hello')   //send to web by defult html
    // res.send('<h1>hello</h1>')

    // res.sendFile('./index.html') //relative path error dega 
    //  res.send('C:/Users/dell/Desktop/NEW NODE FULL/Node App 3/index.html')  //proper path 

    res.json(data)  //json data does not required string change 

    // STATUS BEJ SKTE HAI
    // res.sendStatus(404)
    

})   





server.listen(8080,()=>{  //call back
    console.log("server started");  //serveer started 
});