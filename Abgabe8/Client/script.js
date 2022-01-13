"use strict";
const url = "127.0.0.1"; //url
const path = "/concertEvents";
var Client;
(function (Client) {
    displayEvents();
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
            interpret: interpret.value,
            preis: preis.value,
            datum: datum.value
        }));
        displayEvents();
    });
    async function requestConcerts() {
        let response = await fetch(`http://localhost:3000/concertEvents`);
        let text = await response.text();
        return JSON.parse(text);
    }
    async function displayEvents() {
        let events = await requestConcerts();
        console.log(events);
        let tbody = document.getElementById("table");
        removeChildren(tbody);
        for (let event of events) {
            let tr = document.createElement("tr");
            tr.dataset.id = event._id;
            for (let info of [
                event.interpret,
                event.preis,
                event.datum
            ]) {
                let td = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }
    /* zweiter versuch9funktioniert auch nicht
      async function displayEvents() {
        let events: Concerts[] = await requestConcerts();
        console.log(events);
        let tbody: HTMLTableElement = <HTMLTableElement>document.getElementById("table");
        removeChildren(tbody);
        for (let event of events) {
          let loadedevent: Concerts = {
            interpret : event.interpret,
            preis : event.preis,
            datum: event.datum
          }
            let tr: HTMLTableRowElement = document.createElement("tr");
          //Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'toString')tr.dataset.id = event._id;
          let interpret: HTMLTableCellElement = document.createElement("td");
          let price: HTMLTableCellElement = document.createElement("td");
          let date: HTMLTableCellElement = document.createElement("td");
          interpret.innerHTML = loadedevent.interpret.toString();
          price.innerHTML = loadedevent.preis.toString();
          date.innerHTML = loadedevent.datum.toString();
    
          tr.appendChild(interpret);
          tr.appendChild(price);
          tr.appendChild(date);
          tbody.appendChild(tr);
    
        }
      }
      */
    function removeChildren(element) {
        while (element.lastChild != document.getElementById("wichtig")) {
            element.removeChild(element.lastChild);
        }
    }
})(Client || (Client = {}));
//# sourceMappingURL=script.js.map