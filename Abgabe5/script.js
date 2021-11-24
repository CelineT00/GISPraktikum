var Aufgabe;
(function (Aufgabe) {
    var Events = /** @class */ (function () {
        function Events(person, preis, datum) {
            this.person = person;
            this.preis = preis;
            this.datum = datum;
        }
        return Events;
    }());
    var interpret = document.getElementById("interpret");
    var preis = document.getElementById("preis");
    var datum = document.getElementById("zeit");
    var button = document.getElementById("enter");
    var standartevent = new Events("Twice", "44.2", "17.05.2022");
    var arrayevents = [];
    arrayevents.push(standartevent);
    var localstoragearray;
    var localstoragestring = localStorage.getItem("myArray");
    localstoragearray = JSON.parse(localstoragestring);
    update();
    aktualisierenListe();
    var stringarray = JSON.stringify(arrayevents);
    localStorage.setItem("myArray", stringarray);
    function update() {
        if (localstoragearray != null && localstoragearray.length > 0) {
            var _loop_1 = function (index) {
                var liste = document.createElement("tr");
                var a = document.createElement("td");
                var b = document.createElement("td");
                var c = document.createElement("td");
                var d = document.createElement("td");
                var deletebutton = document.createElement("button");
                deletebutton.innerText = "delete";
                deletebutton.addEventListener("click", deleter);
                function deleter() {
                    document.getElementById("table").removeChild(liste);
                }
                document.getElementById("table").appendChild(liste);
                a.innerText = localstoragearray[index].person;
                b.innerText = localstoragearray[index].preis;
                c.innerText = localstoragearray[index].datum;
                d.appendChild(deletebutton);
                liste.appendChild(a);
                liste.appendChild(b);
                liste.appendChild(c);
                liste.appendChild(d);
            };
            for (var index = 0; index < localstoragearray.length; index++) {
                _loop_1(index);
            }
        }
    }
    function aktualisierenListe() {
        if (arrayevents.length > 0 && arrayevents != null) {
            while (document.getElementById("table").lastChild != document.getElementById("wichtig")) {
                document.getElementById("table").removeChild(document.getElementById("table").lastChild);
            }
            var _loop_2 = function (index) {
                var zeile = document.createElement("tr");
                var a1 = document.createElement("td");
                var b1 = document.createElement("td");
                var c1 = document.createElement("td");
                var d1 = document.createElement("td");
                var deletebutton = document.createElement("button");
                deletebutton.innerText = "delete";
                deletebutton.addEventListener("click", deleter);
                function deleter() {
                    document.getElementById("table").removeChild(zeile);
                }
                document.getElementById("table").appendChild(zeile);
                a1.innerText = arrayevents[index].person;
                b1.innerText = arrayevents[index].preis;
                c1.innerText = arrayevents[index].datum;
                d1.appendChild(deletebutton);
                zeile.appendChild(a1);
                zeile.appendChild(b1);
                zeile.appendChild(c1);
                zeile.appendChild(d1);
            };
            for (var index = 0; index < arrayevents.length; index++) {
                _loop_2(index);
            }
        }
    }
    button.addEventListener("click", function () {
        var neuEvent = new Events(interpret.value, preis.value, datum.value);
        arrayevents.push(neuEvent);
        aktualisierenListe();
        stringarray = JSON.stringify(arrayevents);
        localStorage.setItem("myArray", stringarray);
    });
})(Aufgabe || (Aufgabe = {}));
