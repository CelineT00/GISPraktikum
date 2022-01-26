"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1";
const port = 3000;
const mongoUrl = "mongodb://127.0.0.1:27017"; // für lokale MongoDB
let mongoClient = new mongo.MongoClient(mongoUrl);
async function mongoDBFinden(db, collection, requestObject, response) {
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
async function mongoDBHinzufuegenuBearbeiten(db, collection, request) {
    let jsonString = "";
    request.on("data", data => {
        jsonString += data;
    });
    request.on("end", async () => {
        await mongoClient.connect();
        let produkte = JSON.parse(jsonString);
        if (produkte._id && produkte._id !== "") {
            produkte._id = new mongo.ObjectId(produkte._id);
            mongoClient.db(db).collection(collection).replaceOne({
                _id: produkte._id,
            }, produkte);
        }
        else {
            produkte._id = undefined;
            mongoClient.db(db).collection(collection).insertOne(produkte);
        }
    });
}
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
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
                    break;
            }
            break;
        }
        case "/einzelneProdukte": {
            await mongoClient.connect();
            switch (request.method) {
                case "GET":
                    await mongoDBFinden("tolksdor", "produkte", { name: url.searchParams.get("name") }, response);
                    break;
            }
        }
        default:
            response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
//# sourceMappingURL=server.js.map