namespace Aufgabe {
    let interpret: HTMLInputElement = <HTMLInputElement> document.getElementById("interpret") as HTMLInputElement;
    let preis: HTMLInputElement = <HTMLInputElement> document.getElementById("preis") as HTMLInputElement;
    let datum: HTMLInputElement = <HTMLInputElement> document.getElementById("zeit") as HTMLInputElement;
    let button: HTMLElement = document.getElementById("enter");
    
    
    console.log(interpret);

    button.addEventListener("click", () => { 
            let liste: HTMLElement = document.createElement("tr");
            let a: HTMLElement = document.createElement("td");
            let b: HTMLElement = document.createElement("td");
            let c: HTMLElement = document.createElement("td");
            let d: HTMLElement = document.createElement("td");
            let deletebutton: HTMLElement = document.createElement("button");
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

            function deleter (): void {
            document.getElementById("table").removeChild(liste);
            
        }
       
    });

    let interpretIGotFromStorage;
    let interpretString = JSON.stringify(interpret.value);
    localStorage.setItem("myInterpret", interpretString);
    let stringIGotFromStorage = localStorage.getItem("myInterpret");
    console.log(stringIGotFromStorage);
    
}

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