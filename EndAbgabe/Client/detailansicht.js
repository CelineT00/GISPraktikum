"use strict";
const detailansichturl = "127.0.0.1"; //url
const detailanischtpath = "/einzelneProdukte";
var detailansicht;
(function (detailansicht) {
    let bearbeitenButton = document.getElementById("bearbeiten");
    let loeschenButton = document.getElementById("loeschen");
    class Produkt {
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
})(detailansicht || (detailansicht = {}));
//# sourceMappingURL=detailansicht.js.map