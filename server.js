console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");

// Finish setting up the server

http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader("content-type", "text/html");
    console.log(`request method used: ${method}`);
    const dataChunksArr = [];
    req.on('data', (chunk) =>{
        console.log(`chunk is: ${chunk}`)
        dataChunksArr.push(chunk);
    });
    req.on('end', () => {
        if (method == "POST") {
            const body = JSON.parse(Buffer.concat(dataChunksArr).toString());
            const resBody = { method, url, body};
        } 
        if (url == "/") {
            res.write("<h1>WELCOME CITIZEN")
        } else if (url == "/about") {
            res.write("<p>I am not sure what I'm doing, so bear with.")
        } else if (url == "/echo") {
            res.write(resBody);
            console.log(resBody)
        }
        res.end();
    })
    .listen(3000, () => {
        console.log("Server is listening on port 3000.");
    })
});