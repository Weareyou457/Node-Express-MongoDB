const http = require("http")

// const data = {age:5}  //json data kese jyega 


const fs = require('fs')

const index = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

// console.log(data);


//dynamic routing 

const products = data.products;
console.log(products);





const server = http.createServer((req, res) => {
    console.log("server startded");
    // res.setHeader('dummy','dummyvalue')
    // // res.end('<h1>hello</h1>')


    // res.setHeader('content-Type','application/json')  //kis type ka contain aay hai like abhi json

    // res.end(JSON.stringify(data))


    // res.setHeader('Content-Type','text/html')  //kis type ka contain aay hai

    // res.end('hello')

    // console.log(req.url);   // url dega local ke baad ka 

    //1 staic
    // res.end(index)


    // 2 api 

    //  res.setHeader('Content-Type','applocation/json')
    // res.end(data)

    //3 dynamic data 

    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            res.end(index)
            break;

        case '/api':
            res.setHeader('Content-Type', 'applocation/json')
            res.end(JSON.stringify(data));
            break;

            case '/product':
                res.setHeader('Content-Type', 'text/html')
                let modifiedIndex = index.replace('**title**', products[2].title)
            .replace('**url**', products[1].thumbnail)
            .replace('**price**', products[1].price)
            .replace('**rating**', products[1].rating)
        res.end(modifiedIndex);
                // res.end(index)
                break;

        default:
            res.writeHead(404);
            res.end();
    }


    console.log(req.url, req.method);  //method bhi dega 

    // if (req.url.startsWith('/product')) {
       
    //     // const id = req.url.split('/')[2]
       
    //     // const product = products.find(p => p.id === (+id))
       
    //     console.log(products[1].title)
       
    //     res.setHeader('Content-Type', 'text/html');
    //     let modifiedIndex = index.replace('**title**', products[1].title)
    //         // .replace('**url**', product.thumbnail)
    //         // .replace('**price**', product.price)
    //         // .replace('**rating**', product.rating)
    //     res.end(modifiedIndex);
    //     return;
    // }
})

server.listen(8080);   