"use strict";
const url = "127.0.0.1"; //url
const path = "/concertEvents";
var Client;
(function (Client) {
    displayEvents(document.getElementById("table"));
    let interpret = document.getElementById("interpret");
    let preis = document.getElementById("preis");
    let datum = document.getElementById("datum");
    let button = document.getElementById("enter");
    async function sendJSONStringWithPOST(url, jsonString) {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }
    console.log(interpret);
    button.addEventListener("click", () => {
        sendJSONStringWithPOST("http://localhost:3000/concertEvents", JSON.stringify({
            Interpret: interpret.value,
            Preis: preis.value,
            Datum: datum.value
        }));
    });
    async function requestConcerts() {
        let response = await fetch(`http://localhost:3000/concertEvents`);
        let text = await response.text();
        return JSON.parse(text);
    }
    async function displayEvents(table) {
        let events = await requestConcerts();
        let tbody = table.querySelector("tbody");
        removeChildren(tbody);
        for (let event of events) {
            let tr = document.createElement("tr");
            tr.dataset.id = event._id;
            for (let info of [
                event.interpret,
                event.preis,
                event.datum,
            ]) {
                let td = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
            }
        }
    }
    function removeChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
})(Client || (Client = {}));
//# sourceMappingURL=script.js.map