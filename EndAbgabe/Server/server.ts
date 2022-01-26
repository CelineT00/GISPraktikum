import * as http from "http";
import * as mongo from "mongodb";

const hostname: string = "127.0.0.1";
const port: number = 3000;

const mongoUrl: string = "mongodb://127.0.0.1:27017"; // für lokale MongoDB
let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl);

async function mongoDBFinden(
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

async function mongoDBHinzufuegenuBearbeiten(
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
        let produkte = JSON.parse(jsonString);
        if (produkte._id && produkte._id !== "") {
            produkte._id = new mongo.ObjectId(produkte._id);
            mongoClient.db(db).collection(collection).replaceOne(
                {
                    _id: produkte._id,
                },
                produkte
            );
        } else {
            produkte._id = undefined;
            mongoClient.db(db).collection(collection).insertOne(produkte);
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
                response.write("Server laeuft");
                break;
            case "/alleProdukte": {
                await mongoClient.connect();
                switch (request.method) {
                    case "GET":
                        await mongoDBFinden("tolskdor", "produkte", {}, response);
                        break;
                }
                break;
            }
            case "/neueProdukte": {
                await mongoClient.connect();
                switch (request.method) {
                    case "POST":
                        await mongoDBHinzufuegenuBearbeiten("tolksdor", "produkte", request);
                        console.log("gefunden")
                        break;
                }
                break;
            }
            case "/einzelneProdukte": {
                await mongoClient.connect();
                switch (request.method) {
                    case "GET":
                        await mongoDBFinden("tolksdor", "produkte", { _id: url.searchParams.get("_id") }, response);
                        break;
                }
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