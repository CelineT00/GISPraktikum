"use strict";
const urlproduktanzeige = "127.0.0.1"; //url
const pathproduktanzeige = "/alleProdukte";
var produktanzeige;
(function (produktanzeige) {
    class Produkte {
        _id;
        name;
        ablaufDatum;
        notiz;
        heuteDatum;
        constructor(name, ablaufDatum, notiz, heuteDatum) {
            this.name = name;
            this.ablaufDatum = ablaufDatum;
            this.notiz = notiz;
            this.heuteDatum = heuteDatum;
        }
    }
    zeigeProdukte();
    async function frageProdukteAn() {
        let response = await fetch(`http://localhost:3000/alleProdukte`);
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
                let tdbutton = document.createElement("td");
                let button = document.createElement("button");
                let link = document.createElement("a");
                button.innerText = "Detailansicht";
                button.addEventListener("enter", () => {
                    localStorage.setItem("SpeichernDerDaten", JSON.stringify(produkt));
                });
                link.appendChild(button);
                link.setAttribute("href", "detail.html");
                tdbutton.appendChild(link);
                td.textContent = `${info}`;
                tr.appendChild(tdbutton);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }
    function entferneKind(element) {
        while (element.lastChild != document.getElementById("tr")) {
            element.removeChild(element.lastChild);
        }
    }
})(produktanzeige || (produktanzeige = {}));
//# sourceMappingURL=produktanzeige.js.map