"use strict";
const urlproduktanzeige = "127.0.0.1"; //url
const pathproduktanzeige = "/alleProdukte";
var produktanzeige;
(function (produktanzeige) {
    zeigeProdukte();
    async function frageProdukteAn() {
        let response = await fetch(`http://localhost:3000/neueProdukte`);
        let text = await response.text();
        return JSON.parse(text);
    }
    async function zeigeProdukte() {
        let produkte = await frageProdukteAn();
        console.log(produkte);
        let tbody = document.getElementById("table");
        entferneKind(tbody);
        for (let produkt of produkte) {
            let tr = document.createElement("tr");
            tr.dataset.id = produkt._id;
            for (let info of [
                produkt.name,
                produkt.ablaufDatum
            ]) {
                let td = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }
    function entferneKind(element) {
        while (element.lastChild != document.getElementById("wichtig")) {
            element.removeChild(element.lastChild);
        }
    }
})(produktanzeige || (produktanzeige = {}));
//# sourceMappingURL=produktanzeige.js.map