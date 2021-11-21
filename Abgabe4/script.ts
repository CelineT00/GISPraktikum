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
        newCell0.innerHTML = 'banae';
        newCell1.innerHTML = 'newText';
        newCell2.innerHTML = 'ns';
        newCell3.innerHTML = 'newText';
    }

    function mybuttonHandler(){ 
        let interpretDate: string = inputDate.value;
        let priceValue: number = Number(inputPrice.value);
        let interpretCity: string = inputCity.value;
        let interpretValue: string = inputInterpret.value;

        let newElement = document.createElement("div");
        
        display.appendChild(newElement);
    }

}