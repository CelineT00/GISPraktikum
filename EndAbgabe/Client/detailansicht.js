"use strict";
var detailansicht;
(function (detailansicht) {
    class Produkt {
        _id;
        name;
        ablaufDatum;
        notiz;
        kategorie;
        heuteDatum;
        constructor(name, ablaufDatum, notiz, heuteDatum) {
            this.name = name;
            this.ablaufDatum = ablaufDatum;
            this.notiz = notiz;
            this.heuteDatum = heuteDatum;
        }
    }
    async function sendJSONStringWithPOST(url, jsonString) {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }
    zeigeProdukteDetail();
    ladeFilter();
    async function ladeFilter() {
        let storageFilter = localStorage.getItem("speichereFilter");
        return storageFilter;
    }
    async function ladeProdukt() {
        let storageStringListe = localStorage.getItem("SpeichernDerDaten") || "[]";
        let arrayLadeProdukt = [];
        arrayLadeProdukt[0] = JSON.parse(storageStringListe);
        return arrayLadeProdukt[0];
    }
    async function filterHolen(produkt) {
        let icon = "";
        switch (produkt.kategorie) {
            case "Gemuese": {
                icon = '\u{1F346}';
                break;
            }
            case "Obst": {
                icon = '\u{1F34E}';
                break;
            }
            case "Fleisch": {
                icon = '\u{1F969}';
                break;
            }
            case "Pizza": {
                icon = '\u{1F355}';
                break;
            }
            default: {
                icon = '\u{1F9CA}';
                break;
            }
        }
        return icon;
    }
    async function zeigeProdukteDetail() {
        let produkt = await ladeProdukt();
        console.log(produkt);
        let tbody = document.getElementById("tbodyTabelledetail");
        entferneKind(tbody);
        let tr = document.createElement("tr");
        let tdbutton = document.createElement("td");
        let button = document.createElement("button");
        let link = document.createElement("a");
        button.innerText = "Bearbeiten";
        button.addEventListener("click", () => {
            localStorage.setItem("SpeichernDerDaten", JSON.stringify(produkt));
        });
        link.appendChild(button);
        link.setAttribute("href", "anlegen.html");
        tdbutton.appendChild(link);
        tr.appendChild(tdbutton);
        let tdbuttonloeschen = document.createElement("td");
        let loeschenbutton = document.createElement("button");
        loeschenbutton.innerText = "Loeschen";
        loeschenbutton.addEventListener("click", () => {
            loescheProdukt(produkt);
        });
        tdbuttonloeschen.appendChild(loeschenbutton);
        tr.appendChild(tdbuttonloeschen);
        let iconString = await filterHolen(produkt);
        for (let info of [
            produkt.name,
            produkt.ablaufDatum,
            produkt.notiz,
            iconString,
            produkt.heuteDatum
        ]) {
            let td = document.createElement("td");
            td.textContent = `${info}`;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }
    function entferneKind(element) {
        while (element.lastChild != document.getElementById("trTabelledetail")) {
            element.removeChild(element.lastChild);
        }
    }
    async function loescheProdukt(produkt) {
        await sendJSONStringWithPOST("http://127.0.0.1:3000/alleProdukte", JSON.stringify({
            _id: produkt._id,
            name: produkt.name,
            ablaufDatum: produkt.ablaufDatum,
            notiz: produkt.notiz,
            kategorie: produkt.kategorie,
            heuteDatum: produkt.heuteDatum
        }));
    }
})(detailansicht || (detailansicht = {}));
//# sourceMappingURL=detailansicht.js.map