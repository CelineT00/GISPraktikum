"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", 'htttp://${request.headers.host}');
    if (url.pathname === "/") {
        response.write("Server ist erreichbar");
    }
    else if (url.pathname === "/converDate") {
        console.log("an");
        let input;
        response.write(input);
    }
    else {
        response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname);
() => {
    console.log('Server läuft');
};
//# sourceMappingURL=server.js.map