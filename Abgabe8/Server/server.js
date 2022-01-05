"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("http");
var mongo = require("mongodb");
var hostname = "127.0.0.1";
var port = 3000;
var mongoUrl = "mongodb://localhost:27017"; // für lokale MongoDB
var mongoClient = new mongo.MongoClient(mongoUrl);
function dbFind(db, collection, requestObject, response) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoClient.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mongoClient
                            .db(db)
                            .collection(collection)
                            .find(requestObject)
                            .toArray()];
                case 2:
                    result = _a.sent();
                    console.log(result, requestObject); // bei Fehlern zum Testen
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(result));
                    return [2 /*return*/];
            }
        });
    });
}
function dbAdd(db, collection, request) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonString;
        var _this = this;
        return __generator(this, function (_a) {
            jsonString = "";
            request.on("data", function (data) {
                jsonString += data;
            });
            request.on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mongoClient.connect()];
                        case 1:
                            _a.sent();
                            console.log(jsonString); // bei Fehlern zum Testen
                            event = JSON.parse(jsonString);
                            if (event._id && event._id !== "") {
                                event._id = new mongo.ObjectId(event._id);
                                mongoClient.db(db).collection(collection).replaceOne({
                                    _id: event._id
                                }, event);
                            }
                            else {
                                event._id = undefined;
                                mongoClient.db(db).collection(collection).insertOne(event);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
var server = http.createServer(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                response.statusCode = 200;
                response.setHeader("Content-Type", "text/plain");
                response.setHeader("Access-Control-Allow-Origin", "*");
                url = new URL(request.url || "", "http://" + request.headers.host);
                _a = url.pathname;
                switch (_a) {
                    case "/": return [3 /*break*/, 1];
                    case "/concertEvents": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 8];
            case 1:
                response.write("Server läuft");
                return [3 /*break*/, 9];
            case 2:
                _b = request.method;
                switch (_b) {
                    case "GET": return [3 /*break*/, 3];
                    case "POST": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, dbFind("event", "concert", {
                    _id: new mongo.ObjectId(url.searchParams.get("_id"))
                }, response)];
            case 4:
                _c.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, dbAdd("event", "concert", request)];
            case 6:
                _c.sent();
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                response.statusCode = 404;
                _c.label = 9;
            case 9:
                response.end();
                return [2 /*return*/];
        }
    });
}); });
server.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port);
});
