"use strict";
var aufgabe;
(function (aufgabe) {
    let button = document.getElementById("enter");
    //let ID: HTMLFormElement = document.getElementById("ID") as HTMLFormElement;
    //let date: HTMLInputElement = document.getElementById("date") as HTMLInputElement;
    //let div: HTMLDivElement = document.getElementById("box") as HTMLDivElement;
    button.addEventListener("enter", sending);
    async function sending(_event) {
        let url = "http://127.0.0.1:3000/convertDate";
        let response = await fetch(url);
        let variable = await response.text();
        console.log(variable);
    }
})(aufgabe || (aufgabe = {}));
//# sourceMappingURL=client.js.map