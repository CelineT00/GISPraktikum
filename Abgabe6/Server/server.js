"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/":
            response.write("Server läuft");
            break;
        case "/convertDate":
            let datum = url.searchParams.get("datum");
            console.log(datum);
            response.write("Hier ist das Datum " + datum + ", schoener Tag heute.");
            break;
        default:
            response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
//# sourceMappingURL=server.js.map