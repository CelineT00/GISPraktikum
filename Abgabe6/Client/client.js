"use strict";
var aufgabe;
(function (aufgabe) {
    console.log("Client läuft");
    const url = "http://127.0.0.1:3000";
    const path = "/convertDate";
    const button = document.getElementById("enter");
    const ID = document.getElementById("ID");
    const box = document.getElementById("box");
    button.addEventListener("click", send);
    async function send(evt) {
        evt.preventDefault();
        sendForm();
    }
    console.log(ID, button);
    async function requestTextWithGET(url) {
        let response = await fetch(url);
        let text = await response.text();
        return text;
    }
    async function sendForm() {
        let formData = new FormData(ID);
        let query = new URLSearchParams(formData);
        let urlWithQuery = url + path + "?" + query.toString();
        let response = await fetch(urlWithQuery);
        let responseText = await response.text();
        console.log(responseText);
        let text = document.createElement("p");
        text.textContent = await requestTextWithGET(urlWithQuery);
        box.appendChild(text);
    }
})(aufgabe || (aufgabe = {}));
//# sourceMappingURL=client.js.map