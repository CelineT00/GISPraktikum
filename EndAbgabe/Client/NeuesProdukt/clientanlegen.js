"use strict";
const urlclientanlegen = "127.0.0.1"; //url
const pathclientanlegen = "/neueProdukte";
var ClientAnlegen;
(function (ClientAnlegen) {
    let heutigesDatum = new Date();
    let name = document.getElementById("name");
    let ablaufDatum = document.getElementById("ablaufdatum");
    let notiz = document.getElementById("notiz");
    let button = document.getElementById("enter");
    async function sendJSONStringWithPOST(url, jsonString) {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }
    button.addEventListener("click", () => {
        sendJSONStringWithPOST("http://localhost:3000/", JSON.stringify({
            name: name.value,
            ablaufDatum: ablaufDatum.value,
            notiz: notiz.value,
            heuteDatum: heutigesDatum
        }));
    });
    async function findeProdukt(id) {
        let response = await fetch(`http://localhost:3000/alleProdukte?_id=${id}`);
        let text = await response.text();
        return JSON.parse(text);
    }
    async function editiereProdukt(event) {
        let target = event.currentTarget;
        let neuesprodukt = (await findeProdukt(target.dataset?.id || ""))[0];
        neuesprodukt = neuesprodukt || {
            _id: "",
            name: "",
            ablaufDatum: heutigesDatum,
            notiz: "",
            heuteDatum: heutigesDatum,
        };
        for (let info of [
            ["_id", neuesprodukt._id],
            ["name", neuesprodukt.name],
            ["ablaufDatum", neuesprodukt.ablaufDatum],
            ["notiz", neuesprodukt.notiz],
            ["heuteDatum", neuesprodukt.heuteDatum],
        ]) {
            let input = document.querySelector(`#${info[0]}`);
        }
    }
})(ClientAnlegen || (ClientAnlegen = {}));
//# sourceMappingURL=clientanlegen.js.map