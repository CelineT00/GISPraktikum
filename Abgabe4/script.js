var Aufgabe;
(function (Aufgabe) {
    var interpret = document.getElementById("interpret");
    var preis = document.getElementById("preis");
    var datum = document.getElementById("zeit");
    var button = document.getElementById("enter");
    console.log(interpret);
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
/*
namespace testEventspace{

    const inputDate: HTMLInputElement = <HTMLInputElement>document.getElementById("input-date");
    const inputPrice: HTMLInputElement = <HTMLInputElement>document.getElementById("input-price");
    const inputCity: HTMLInputElement = <HTMLInputElement>document.getElementById("input-city");
    const inputInterpret: HTMLInputElement = <HTMLInputElement>document.getElementById("input-interpret");
    const display: HTMLElement = <HTMLElement>document.querySelector("#display");
    const myButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("#mache-etwas");
    const myTable: HTMLElement = <HTMLElement>document.getElementById("#my-table");
    myButton.addEventListener("click",addRow(myTable));


    console.log(inputDate);
    console.log(inputPrice);
    console.log(inputCity);
    console.log(inputInterpret);

    function addRow(tableID) {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(1);
        var newCell0 = newRow.insertCell(0);
        var newCell1 = newRow.insertCell(1);
        var newCell2 = newRow.insertCell(2);
        var newCell3 = newRow.insertCell(3);
        newCell0.innerHTML = interpretDate : string;
        newCell1.innerHTML = 'newText';
        newCell2.innerHTML = 'ns';
        newCell3.innerHTML = 'newText';
    }

    function mybuttonHandler(){
        let interpretDate: string = inputDate.value;
        let priceValue: number = Number(inputPrice.value);
        let interpretCity: string = inputCity.value;
        let interpretValue: string = inputInterpret.value;

        let newElement = addRow;
        
        display.appendChild(newElement);
    }

}
*/ 
