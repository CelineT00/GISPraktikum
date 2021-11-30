var Aufgabe;
(function (Aufgabe) {
    var interpret = document.getElementById("interpret");
    var preis = document.getElementById("preis");
    var datum = document.getElementById("zeit");
    var button = document.getElementById("enter");
    var table = document.getElementById("table");
    var Events = /** @class */ (function () {
        function Events(person, preis, datum, nummer) {
            this.person = person;
            this.preis = preis;
            this.datum = datum;
            this.nummer = nummer;
        }
        Events.prototype.returnID = function () {
            return this.nummer.toString();
        };
        return Events;
    }());
    var eventlist = [];
    var Eventstoring = /** @class */ (function () {
        function Eventstoring() {
        }
        Eventstoring.eventsaving = function () {
            var stringEventListe = JSON.stringify(eventlist);
            localStorage.setItem("EventArray", stringEventListe);
        };
        Eventstoring.eventloading = function () {
            var storageStringListe = localStorage.getItem("EventArray") || "[]";
            while (table.lastChild != document.getElementById("wichtig")) {
                table.removeChild(table.lastChild);
            }
            var _loop_1 = function (event_1) {
                var zaehler = 0;
                var liste = document.createElement("tr");
                var a = document.createElement("td");
                var b = document.createElement("td");
                var c = document.createElement("td");
                var d = document.createElement("td");
                var deletebutton = document.createElement("button");
                deletebutton.innerText = "delete";
                var buttonid = zaehler.toString();
                deletebutton.id = buttonid;
                deletebutton.addEventListener("click", deleter);
                function deleter() {
                    eventlist.forEach(function (event, index) {
                        if (event.returnID() == deletebutton.id) {
                            eventlist.splice(index, 1);
                        }
                    });
                    Eventstoring.eventsaving();
                    table.removeChild(liste);
                }
                document.getElementById("table").appendChild(liste);
                a.innerText = event_1.person;
                b.innerText = event_1.preis;
                c.innerText = event_1.datum;
                d.appendChild(deletebutton);
                liste.appendChild(a);
                liste.appendChild(b);
                liste.appendChild(c);
                liste.appendChild(d);
                zaehler++;
            };
            for (var _i = 0, _a = JSON.parse(storageStringListe); _i < _a.length; _i++) {
                var event_1 = _a[_i];
                _loop_1(event_1);
            }
        };
        return Eventstoring;
    }());
    Eventstoring.eventloading();
    button.addEventListener("click", function () {
        var neuEvent = new Events(interpret.value, preis.value, datum.value, eventlist.length);
        eventlist.push(neuEvent);
        Eventstoring.eventsaving();
        Eventstoring.eventloading();
    });
})(Aufgabe || (Aufgabe = {}));
