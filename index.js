const scraper = require('./scraper');
var fs = require('fs');
//var x = await scraper.getResults;

let x;
//const linesArray = fs.readFileSync('wishList.txt').split('\n');
const linesArray = fs.readFileSync('wishList.txt', "utf-8").split("\n");
console.log(linesArray);

itemArr = []

async function f1(){
    x = await scraper.getResults;
    console.log(x.length);

    let wishList = ["Los Angeles", "Joy-Con", "Zojirushi"];

    for(let i = 0; i < x.length; i++){
        for(let t = 0; t < linesArray.length; t++){
            if(x[i].item.includes(linesArray[t]) && linesArray[t].length > 1){
                console.log(x[i]);
                itemArr.push(x[i]);
            }
        }
        /*
        if(x[i].id === 97){
            console.log(x[i]);
        }
        */
    }
    if(itemArr.length === 0){
        console.log("None of the items you want are on sale. HA!")
    } else {
        console.log(itemArr);
    }
}

f1()


//console.log(`Scraper: ${x}`);


/*
async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}

f1();

*/

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;


fs.readFile('./index.html', (err, html) =>{
    if(err) throw err;
    const server = http.createServer((req,res) => {
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end('<p>END</p>');
    }).listen(port);
    
    

});
/*
const server = http.createServer((req,res) => {
    res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html>'+
        '<html>'+
        ' <head>'+
        ' <meta charset="utf-8" />'+
        ' <title>SlickScraper</title>'+
        ' </head>'+ 
        ' <body>'+
        '<h1>SlickScraper: The Slickest of Scrapers</h1>' +
        "<p>Stop wasting time and money scrolling through discount sites. Just tell us what you are looking for and we will scour the internet looking for deals on your items and let you know when they're on sale! </p>"+
        ' </body>'+
        '</html>');
    res.write("What's up");
    res.end('<p>END</p>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/