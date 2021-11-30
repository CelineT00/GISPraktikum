var localStorageBeispiel;
(function (localStorageBeispiel) {
    //Variante 1
    var inputFeld = document.getElementById("input-element");
    /*Variante 2
        const inputFeld: HTMLInputElement = document.getElementById("input-element") as HTMLInputElement;
    */
    var saveButton = document.getElementById("save-button");
    var loadButton = document.getElementById("load-button");
    var display = document.getElementById("dispaly");
    saveButton.addEventListener("click", saveButtonHandler);
    loadButton.addEventListener("click", loadButtonHandler);
    function saveButtonHandler() {
        console.log("Save Button clicked");
        console.log("Aktueller Input:" + inputFeld.value);
        localStorage.setItem("gis_praktikum_input", inputFeld.value);
    }
    function loadButtonHandler() {
        console.log("Load Button clicked");
        var valueFromLocalStorage = localStorage.getItem("gis_praktikum_input");
        console.log("aktueller Wert im Local Storage:" + valueFromLocalStorage);
        display.textContent = valueFromLocalStorage;
    }
})(localStorageBeispiel || (localStorageBeispiel = {}));
