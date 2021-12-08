import * as http from "http";

const hostname: string = 'localhost';
const port: number = 3000;

interface Date {
    datum: string;
}

const server: http.Server = http.createServer(
    (request: http.IncomingMessage, response: http.ServerResponse) => {

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        let url: URL = new URL(request.url || "", 'htttp://${request.headers.host}');

        if (url.pathname === "/") {
            response.write("Server ist erreichbar");
        }
        else if (url.pathname === "/converDate"){
            console.log("an");
                let input: Date;
                response.write(input);   
        }
        else {
            response.statusCode = 404;
        }
        response.end();

    }
);

server.listen(port, hostname); () => {
    console.log('Server läuft');
};
