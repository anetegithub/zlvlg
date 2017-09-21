define(["require", "exports", "http"], function (require, exports, http) {
    "use strict";
    exports.__esModule = true;
    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }).listen(process.env.port || 1337);
});
