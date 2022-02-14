namespace produktanzeige {

    class Produkte {
        _id?: string;
        name: string;
        ablaufDatum: Date;
        notiz: string;
        kategorie: string;
        heuteDatum: Date;


        constructor(name: string, ablaufDatum: Date, notiz: string, heuteDatum: Date) {
            this.name = name;
            this.ablaufDatum = ablaufDatum;
            this.notiz = notiz;
            this.heuteDatum = heuteDatum;
        }

    }
    zeigeProdukte();
    localStorageloeschen();

    async function localStorageloeschen(): Promise<void> { // beim neu laden, wird der localStorage geloescht
        if (localStorage.getItem("SpeichernDerDaten")) {
            localStorage.removeItem("SpeichernDerDaten");
        }
        if (localStorage.getItem("speichereFilter")) {
            localStorage.removeItem("speichereFilter");
        }
    }

    async function iconsHolen(produkt: Produkte): Promise<String> { //icon fuer die verschiedenn Produkte holen
        let icon: String = "";
        switch (produkt.kategorie) {
            case "Gemuese": {
                icon = '\u{1F346}';
                break;
            }
            case "Obst": {
                icon = '\u{1F34E}';
                break;
            }
            case "Fleisch": {
                icon = '\u{1F969}';
                break;
            }
            case "Pizza": {
                icon = '\u{1F355}';
                break;
            }
            default: {
                icon = '\u{1F9CA}';
                break;
            }

        }
        return icon;
    }

    async function abgelaufen(produkt: Produkte): Promise<boolean> { //schaut ob das Produkt abgelaufen ist
        let ablaufdatum: Date = new Date(produkt.ablaufDatum);
        let heutigesDatum: Date = new Date();
        if (ablaufdatum.getTime() <= heutigesDatum.getTime()) {
            return true;
        }
        else {
            return false;
        }
    }

    async function baldabgelaufen(produkt: Produkte): Promise<boolean> { //schaut ob das Produkt bald abgelaufen ist
        let ablaufdatum: Date = new Date(produkt.ablaufDatum);
        let heutigesDatum: Date = new Date();
        if (ablaufdatum.getFullYear == heutigesDatum.getFullYear) {
            if (ablaufdatum.getMonth == heutigesDatum.getMonth) {
                if ((ablaufdatum.getDate() - 3) <= heutigesDatum.getDate() && await abgelaufen(produkt) == false) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false; (ablaufdatum.getTime() - 3) <= heutigesDatum.getTime()
            }
        } else {
            return false;
        }
    }

    let filter: HTMLSelectElement = document.getElementById("filter") as HTMLSelectElement;


    async function filterHolen(): Promise<Produkte[]> { //holt den filter, der im localstorage ist
        let produkte: Produkte[] = await frageProdukteAn();
        let arrayProdukte: Produkte[] = [];
        for (let i = 0; i < produkte.length; i++) {
            switch (filter.value) {
                case "abgelaufen": {
                    if (await abgelaufen(produkte[i]) == true) {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "baldabgelaufen": {
                    if (await baldabgelaufen(produkte[i]) == true) {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "gemuese": {
                    if (produkte[i].kategorie == "Gemuese") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "obst": {
                    if (produkte[i].kategorie == "Obst") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "fleisch": {
                    if (produkte[i].kategorie == "Fleisch") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "pizza": {
                    if (produkte[i].kategorie == "Pizza") {
                        arrayProdukte.push(produkte[i]);
                    }
                    break;
                }
                case "alleProdukte": {
                    arrayProdukte.push(produkte[i]);
                    break;
                }
                default: {
                    arrayProdukte.push(produkte[i]);
                    break;
                }

            }
        }
        return arrayProdukte;
    }

    async function frageProdukteAn(): Promise<Produkte[]> { //wartet auf dei Produkte vom Server
        let response: Response = await fetch(
            "http://127.0.0.1:3000/alleProdukte"
        );
        let text: string = await response.text();
        return JSON.parse(text) as Produkte[];
    }

    async function zeigeProdukte() { //zeigt die Produkte auf der Website an
        let produkte: Produkte[] = await filterHolen();
        console.log(produkte);
        let tbody: HTMLTableElement = document.getElementById("tbodyTabelle") as HTMLTableElement;
        entferneKind(tbody);
        for (let produkt of produkte) {
            let tr = document.createElement("tr");
            tr.dataset.id = produkt._id;
            let tdbutton = document.createElement("td");
            let button = document.createElement("button");
            let link = document.createElement("a");
            button.innerText = "Detailansicht";
            button.addEventListener("click", () => {
                localStorage.setItem("SpeichernDerDaten", JSON.stringify(produkt));
            });
            link.appendChild(button);
            link.setAttribute("href", "detail.html");
            tdbutton.appendChild(link);
            tr.appendChild(tdbutton);
            let iconString: String = await iconsHolen(produkt);
            for (let info of [
                produkt.name,
                produkt.ablaufDatum,
                iconString
            ]) {
                let td = document.createElement("td");

                td.textContent = `${info}`;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }

    function entferneKind(element: HTMLTableElement) { // entfernt letzten Tabelleneintrag um die Produukte darzustellen
        while (element.lastChild != document.getElementById("trTabelle")) {
            element.removeChild(element.lastChild);

        }
    }

    let buttonfilter: HTMLElement = document.getElementById("enter") as HTMLElement;


    buttonfilter.addEventListener("click", () => { // was der button macht wenn er gedrueckt wird

        zeigeProdukte();
        localStorage.setItem("speichereFilter", JSON.stringify(filter.value));
    });

}
