"use strict";
var ClientAnlegen;
(function (ClientAnlegen) {
    let heutigesDatum = new Date();
    let name = document.getElementById("name");
    let ablaufDatum = document.getElementById("ablaufdatum");
    let notiz = document.getElementById("notiz");
    let kategorie = document.getElementById("kategorie");
    let button = document.getElementById("enter");
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
    produktDarstellen();
    async function sendJSONStringWithPOST(url, jsonString) {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }
    async function ladeProdukt() {
        let storageStringListe = localStorage.getItem("SpeichernDerDaten") || "[]";
        let arrayLadeProdukt = [];
        arrayLadeProdukt[0] = JSON.parse(storageStringListe);
        return arrayLadeProdukt[0];
    }
    async function hinzufuegenoderBearbeiten() {
        if (localStorage.getItem("SpeichernDerDaten")) {
            let detailAnsichtProdukt = await ladeProdukt();
            sendJSONStringWithPOST("http://127.0.0.1:3000/neueProdukte", JSON.stringify({
                _id: detailAnsichtProdukt._id,
                name: name.value,
                ablaufDatum: ablaufDatum.value,
                notiz: notiz.value,
                heuteDatum: heutigesDatum,
                kategorie: kategorie.value
            }));
        }
        else {
            sendJSONStringWithPOST("http://127.0.0.1:3000/neueProdukte", JSON.stringify({
                _id: "",
                name: name.value,
                ablaufDatum: ablaufDatum.value,
                notiz: notiz.value,
                heuteDatum: heutigesDatum,
                kategorie: kategorie.value
            }));
        }
    }
    async function produktDarstellen() {
        let detailAnsichtProdukt = await ladeProdukt();
        if (detailAnsichtProdukt.name) {
            name.value = detailAnsichtProdukt.name;
            ablaufDatum.value = detailAnsichtProdukt.ablaufDatum.toString();
            notiz.value = detailAnsichtProdukt.notiz;
            kategorie.value = detailAnsichtProdukt.kategorie;
        }
    }
    button.addEventListener("click", () => {
        hinzufuegenoderBearbeiten();
    });
})(ClientAnlegen || (ClientAnlegen = {}));
//# sourceMappingURL=clientanlegen.js.map