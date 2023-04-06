// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");

// Finish setting up the server

http
  .createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader("content-type", "text/html");
    console.log(`request method used: ${method}`);
    const dataChunksArr = [];
    req.on("data", (chunk) => {
      console.log(`chunk is: ${chunk}`);
      dataChunksArr.push(chunk);
    });
    req.on("end", () => {
      const body = JSON.parse(Buffer.concat(dataChunksArr).toString());
      const resBody = { method, url, body };
      if (method == "POST") {
        if (url == "/") {
          res.statusCode = 200;
          res.write("<h1>WELCOME CITIZEN</h1>");
          console.log("home route");
        } else if (url == "/echo") {
          res.statusCode = 200;
          res.write(JSON.stringify(resBody));
        } else {
          res.statusCode = 404;
          res.write("PAGE NOT FOUND");
        }
        res.end();
      }
    });

    if (url == "/about") {
      res.statusCode = 200;
      res.write("<p>I am not sure what I'm doing, so bear with.</p>");
      res.end();
    }
  })
  .listen(5001, () => {
    console.log("Server is listening on port 3000.");
  });
