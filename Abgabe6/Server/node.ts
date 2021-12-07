import * as http from "http";

const hostname: string = "127.0.0.1";
const port: number = 3000;

const server: http.Server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {

      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.setHeader("Access-Control-Allow-Origin", "*"); //Erlaubt Zugriff

      //Routing -> Pfade definieren
      let url: URL = new URL(request.url || "", `http://${request.headers.host}`); //Url element

      switch (url.pathname) { //Pfad wird gesucht
      
      case "/":   //Startpunkt des Servers, Mutepfad
          response.write("Server erreichbar");
          break;
      case "/convertDate":
          break;
          
  
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
