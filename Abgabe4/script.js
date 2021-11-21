var testEventspace;
(function (testEventspace) {
    var inputDate = document.getElementById("input-date");
    var inputPrice = document.getElementById("input-price");
    var inputCity = document.getElementById("input-city");
    var inputInterpret = document.getElementById("input-interpret");
    var display = document.querySelector("#display");
    var myButton = document.getElementById("#mache-etwas");
    var myTable = document.getElementById("#my-table");
    myButton.addEventListener("click", addRow(myTable));
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
    function mybuttonHandler() {
        var interpretDate = inputDate.value;
        var priceValue = Number(inputPrice.value);
        var interpretCity = inputCity.value;
        var interpretValue = inputInterpret.value;
        var newElement = document.createElement("div");
        display.appendChild(newElement);
    }
})(testEventspace || (testEventspace = {}));
