import * as http from "http";
import * as mongo from "mongodb";

    const hostname: string = "127.0.0.1"; 
    const port: number = 3000;
  
    const mongoUrl: string = "mongodb://127.0.0.1:27017"; // für lokale MongoDB
    let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl);

    async function dbFind(
        db: string,
        collection: string,
        requestObject: any,
        response: http.ServerResponse
      ) {
        await mongoClient.connect();
        let result = await mongoClient
          .db(db)
          .collection(collection)
          .find(requestObject)
          .toArray();
        console.log(result, requestObject); // bei Fehlern zum Testen
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result));
        
      }

      async function dbAdd(
        db: string,
        collection: string,
        request: http.IncomingMessage
      ) {
        let jsonString = "";
        request.on("data", data => {
          jsonString += data;
        });
        request.on("end", async () => {
          await mongoClient.connect();
          console.log(jsonString); // bei Fehlern zum Testen
          let event = JSON.parse(jsonString);
          if (event._id && event._id !== "") {
            event._id = new mongo.ObjectId(event._id);
            mongoClient.db(db).collection(collection).replaceOne(
              {
                _id: event._id,
              },
              event
            );
          } else {
            event._id = undefined;
            mongoClient.db(db).collection(collection).insertOne(event);
          }
        });
      } 


    const server: http.Server = http.createServer(
        async (request: http.IncomingMessage, response: http.ServerResponse) => {
        
          response.statusCode = 200;
    
          response.setHeader("Access-Control-Allow-Origin", "*"); 
          
          let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
          
        
        switch (url.pathname) {
          case "/": 
            response.write("Server läuft");
            break;
            case "/concerts": {
              switch (request.method) {
                case "GET":
                  await dbFind("tolskdor", "events", {}, response);
                  break;
              }
            }
          case "/concertEvents":{
            await mongoClient.connect();
            switch (request.method) {
                case "GET":
                  await dbFind(
                    "tolksdor",
                    "events",
                    {
                      concerts: url.searchParams.get("events")
                    },
                    response
                  );
                  break;
                case "POST":
                  await dbAdd("tolksdor", "events", request);
                  break;
              }
              break;
            }
          default:
            response.statusCode = 404; 
        }
        response.end(); 
      }
    );
    

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`); 
    });
