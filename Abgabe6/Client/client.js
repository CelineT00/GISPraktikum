"use strict";
var Client;
(function (Client) {
    console.log("client läuft");
    const url = "http://127.0.0.1:3000";
    const myForm = document.getElementById("myForm");
    const Sendbutton = document.getElementById("sendbutton");
    Sendbutton.addEventListener("click", function (evt) {
        evt.preventDefault();
        sendForm();
    });
    async function sendForm() {
        let formData = new FormData(myForm);
        let query = new URLSearchParams(formData);
        let urlwithQuery = url + "?" + query.toString();
        let response = await fetch(urlwithQuery);
        let responseText = await response.text();
        console.log(responseText);
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map