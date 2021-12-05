"use strict";
var Aufgabe;
(function (Aufgabe) {
    let interpret = document.getElementById("interpret");
    let preis = document.getElementById("preis");
    let datum = document.getElementById("zeit");
    let button = document.getElementById("enter");
    let table = document.getElementById("table");
    class Events {
        person;
        preis;
        datum;
        nummer;
        constructor(person, preis, datum, nummer) {
            this.person = person;
            this.preis = preis;
            this.datum = datum;
            this.nummer = nummer;
        }
        returnID() {
            return this.nummer.toString();
        }
    }
    let eventlist = [];
    class Eventstoring {
        static eventsaving() {
            let stringEventListe = JSON.stringify(eventlist);
            localStorage.setItem("EventArray", stringEventListe);
        }
        static eventloading() {
            let storageStringListe = localStorage.getItem("EventArray") || "[]";
            while (table.lastChild != document.getElementById("wichtig")) {
                table.removeChild(table.lastChild);
            }
            for (let event of JSON.parse(storageStringListe)) {
                let liste = document.createElement("tr");
                let a = document.createElement("td");
                let b = document.createElement("td");
                let c = document.createElement("td");
                let d = document.createElement("td");
                let deletebutton = document.createElement("button");
                deletebutton.innerText = "delete";
                let buttonid = event.nummer.toString();
                deletebutton.id = buttonid;
                deletebutton.addEventListener("click", deleter);
                function deleter() {
                    let idbutt = parseInt(deletebutton.id);
                    eventlist = eventlist.filter(item => item.nummer !== idbutt);
                    localStorage.clear();
                    Eventstoring.eventsaving();
                    table.removeChild(liste);
                }
                document.getElementById("table").appendChild(liste);
                a.innerText = event.person;
                b.innerText = event.preis;
                c.innerText = event.datum;
                d.appendChild(deletebutton);
                liste.appendChild(a);
                liste.appendChild(b);
                liste.appendChild(c);
                liste.appendChild(d);
            }
        }
    }
    Eventstoring.eventloading();
    button.addEventListener("click", () => {
        if (interpret.value != "" && preis.value != "" && datum.value != "") {
            eventlist.length = 0;
            if (eventlist === null || eventlist.length < 1) {
                eventlist = JSON.parse(localStorage.getItem("EventArray"));
                if (eventlist === null || eventlist.length < 1) {
                    let neuEvent = new Events(interpret.value, preis.value, datum.value, 0);
                    eventlist = [];
                    eventlist[0] = neuEvent;
                }
                else {
                    let neuEvent = new Events(interpret.value, preis.value, datum.value, (eventlist[eventlist.length - 1].nummer + 1));
                    eventlist.push(neuEvent);
                }
            }
            else {
                let neuEvent = new Events(interpret.value, preis.value, datum.value, (eventlist[eventlist.length - 1].nummer + 1));
                eventlist.push(neuEvent);
            }
            Eventstoring.eventsaving();
            Eventstoring.eventloading();
        }
    });
})(Aufgabe || (Aufgabe = {}));
//# sourceMappingURL=script.js.map