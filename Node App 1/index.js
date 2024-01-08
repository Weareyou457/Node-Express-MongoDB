const lib = require('./lib.js')  // iske lie package json me common js hona chiye 


console.log(lib); //function dega 

console.log(lib.esum(4,5),lib.diff(4,5));
const a=5;


// es module 

//par iske liye package json me type module hona jruri hai 

// import {sum,diff} from './lib.js'

// console.log(sum(4,5));


//file system 

const fs = require('fs')

// const txt =  fs.readFileSync("demo.txt")   //syncronous chlega sync se 

// const txt =  fs.readFileSync("demo.txt",'utf-8')   //syncronous chlega sync se 

const txt1= fs.readFile("demo.txt","utf-8",(err,txt)=>{
    console.log(txt);
})   //time saving process hai ASYNCROUNS NATURE 

// console.log(txt);    //buffer me output aaya hai 

console.log(txt1);



