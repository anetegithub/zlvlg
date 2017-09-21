import http = require('http');
import fileSystem = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(process.env.port || 1337);