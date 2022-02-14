"use strict";
var produktanzeige;
(function (produktanzeige) {
    class Produkte {
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
    zeigeProdukte();
    localStorageloeschen();
    async function localStorageloeschen() {
        if (localStorage.getItem("SpeichernDerDaten")) {
            localStorage.removeItem("SpeichernDerDaten");
        }
        if (localStorage.getItem("speichereFilter")) {
            localStorage.removeItem("speichereFilter");
        }
    }
    async function iconsHolen(produkt) {
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
    async function abgelaufen(produkt) {
        let ablaufdatum = new Date(produkt.ablaufDatum);
        let heutigesDatum = new Date();
        if (ablaufdatum.getTime() <= heutigesDatum.getTime()) {
            return true;
        }
        else {
            return false;
        }
    }
    async function baldabgelaufen(produkt) {
        let ablaufdatum = new Date(produkt.ablaufDatum);
        let heutigesDatum = new Date();
        if (ablaufdatum.getFullYear == heutigesDatum.getFullYear) {
            if (ablaufdatum.getMonth == heutigesDatum.getMonth) {
                if ((ablaufdatum.getDate() - 3) <= heutigesDatum.getDate() && await abgelaufen(produkt) == false) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
                (ablaufdatum.getTime() - 3) <= heutigesDatum.getTime();
            }
        }
        else {
            return false;
        }
    }
    let filter = document.getElementById("filter");
    async function filterHolen() {
        let produkte = await frageProdukteAn();
        let arrayProdukte = [];
        for (let i = 0; i < produkte.length; i++) {
            switch (filter.value) {
                case "abgelaufen": {
                    if (await abgelaufen(produkte[i]) == true) {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "baldabgelaufen": {
                    if (await baldabgelaufen(produkte[i]) == true) {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "gemuese": {
                    if (produkte[i].kategorie == "Gemuese") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "obst": {
                    if (produkte[i].kategorie == "Obst") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "fleisch": {
                    if (produkte[i].kategorie == "Fleisch") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "pizza": {
                    if (produkte[i].kategorie == "Pizza") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "alleProdukte": {
                    arrayProdukte.push(produkte[i]);
                    break;
                }
                default: {
                    arrayProdukte.push(produkte[i]);
                    break;
                }
            }
        }
        return arrayProdukte;
    }
    async function frageProdukteAn() {
        let response = await fetch("http://127.0.0.1:3000/alleProdukte");
        let text = await response.text();
        return JSON.parse(text);
    }
    async function zeigeProdukte() {
        let produkte = await filterHolen();
        console.log(produkte);
        let tbody = document.getElementById("tbodyTabelle");
        entferneKind(tbody);
        for (let produkt of produkte) {
            let tr = document.createElement("tr");
            tr.dataset.id = produkt._id;
            let tdbutton = document.createElement("td");
            let button = document.createElement("button");
            let link = document.createElement("a");
            button.innerText = "Detailansicht";
            button.addEventListener("click", () => {
                localStorage.setItem("SpeichernDerDaten", JSON.stringify(produkt));
            });
            link.appendChild(button);
            link.setAttribute("href", "detail.html");
            tdbutton.appendChild(link);
            tr.appendChild(tdbutton);
            let iconString = await iconsHolen(produkt);
            for (let info of [
                produkt.name,
                produkt.ablaufDatum,
                iconString
            ]) {
                let td = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }
    function entferneKind(element) {
        while (element.lastChild != document.getElementById("trTabelle")) {
            element.removeChild(element.lastChild);
        }
    }
    let buttonfilter = document.getElementById("enter");
    buttonfilter.addEventListener("click", () => {
        zeigeProdukte();
        localStorage.setItem("speichereFilter", JSON.stringify(filter.value));
    });
})(produktanzeige || (produktanzeige = {}));
//# sourceMappingURL=produktanzeige.js.map