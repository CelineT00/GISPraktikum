var Aufgabe;
(function (Aufgabe) {
    var interpret = document.getElementById("interpret");
    var preis = document.getElementById("preis");
    var datum = document.getElementById("zeit");
    var button = document.getElementById("enter");
    button.addEventListener("click", function () {
        var liste = document.createElement("tr");
        var a = document.createElement("td");
        var b = document.createElement("td");
        var c = document.createElement("td");
        var d = document.createElement("td");
        var deletebutton = document.createElement("button");
        deletebutton.innerText = "delete";
        document.getElementById("table").appendChild(liste);
        a.innerText = interpret.value;
        b.innerText = preis.value;
        c.innerText = datum.value;
        d.appendChild(deletebutton);
        liste.appendChild(a);
        liste.appendChild(b);
        liste.appendChild(c);
        liste.appendChild(d);
        deletebutton.addEventListener("click", deleter);
        function deleter() {
            document.getElementById("table").removeChild(liste);
        }
    });
})(Aufgabe || (Aufgabe = {}));
