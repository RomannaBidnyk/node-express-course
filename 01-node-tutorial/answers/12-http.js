const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home page");
  } else if (req.url === "/about") {
    res.end("About page");
  } else {
    res.end(`
        <h1>404 Page Not Found</h1>
        <a href = "/"> Back Home </a>
       `);
  }
});

server.listen(3000);
