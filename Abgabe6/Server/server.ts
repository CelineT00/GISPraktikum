import * as http from "http";

    const hostname: string = "127.0.0.1"; 
    const port: number = 3000;
  
    const server: http.Server = http.createServer(
        (request: http.IncomingMessage, response: http.ServerResponse) => {
        
          response.statusCode = 200;
    
          response.setHeader("Content-Type", "text/plain");
          response.setHeader("Access-Control-Allow-Origin", "*"); 
          
          let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
          
        
        switch (url.pathname) {
          case "/": 
            response.write("Server läuft");
            break;
          case "/convertDate":
            let datum: string = url.searchParams.get("datum");
            let date: Date = new Date(datum);
            console.log(date);
            response.write("    Jahr:  " + date.toISOString().substring(0,4));
            response.write("    Monat:  " + date.toISOString().substring(5,7));
            response.write("    Tag:  " + date.toISOString().substring(8,10));
            break;
          default:
            response.statusCode = 404; 
        }
        response.end(); 
      }
    );
    

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`); 
    });

