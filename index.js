// visit http://localhost:8080/ to view if you cloned.

const http = require("http");
const url = require("url");
const fs = require("fs");

// http://localhost:8080/
// q = 'http://localhost:8080/default.htm?year=2017&month=february';
// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    // console.log(q);
    // handle landing page
    if (q.path === "/") {
      fs.readFile("index.html", (err, data) => {
        if (err) throw new Error("Error");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      const filename = "." + q.pathname;
      fs.readFile(filename, (err, data) => {
        // handle 404 error
        if (err) {
          return fs.readFile("404.html", (err, data) => {
            if (err) throw err;
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          });
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
