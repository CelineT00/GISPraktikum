namespace detailansicht {

    class Produkt {
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

    async function sendJSONStringWithPOST(
        url: RequestInfo,
        jsonString: string
    ): Promise<void> {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }

    zeigeProdukteDetail();
    ladeFilter();

    async function ladeFilter(): Promise<String> { //holt filtereinstellungen aus dem localStorage
        let storageFilter: string = localStorage.getItem("speichereFilter");
        return storageFilter;
    }

    async function ladeProdukt(): Promise<Produkt> { // holt Produkt aus dem LocalStorage
        let storageStringListe: string = localStorage.getItem("SpeichernDerDaten") || "[]";
        let arrayLadeProdukt: Produkt[] = [];
        arrayLadeProdukt[0] = JSON.parse(storageStringListe);
        return arrayLadeProdukt[0];
    }

    async function filterHolen(produkt: Produkt): Promise<String> { //fur die verschiedenen Filter Icons zuordnen
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

    async function zeigeProdukteDetail() { //zeigt das Produkt mit allen Details
        let produkt: Produkt = await ladeProdukt();
        console.log(produkt);
        let tbody: HTMLTableElement = document.getElementById("tbodyTabelledetail") as HTMLTableElement;
        entferneKind(tbody);
        let tr = document.createElement("tr");

        let tdbutton = document.createElement("td");
        let button = document.createElement("button");
        let link = document.createElement("a");
        button.innerText = "Bearbeiten";
        button.addEventListener("click", () => {
            localStorage.setItem("SpeichernDerDaten", JSON.stringify(produkt));
        });
        link.appendChild(button);
        link.setAttribute("href", "anlegen.html");
        tdbutton.appendChild(link);
        tr.appendChild(tdbutton);

        let tdbuttonloeschen = document.createElement("td");
        let loeschenbutton = document.createElement("button");
        loeschenbutton.innerText = "Loeschen";
        loeschenbutton.addEventListener("click", () => {
            loescheProdukt(produkt)
        });
        tdbuttonloeschen.appendChild(loeschenbutton);
        tr.appendChild(tdbuttonloeschen);
        let iconString: String = await filterHolen(produkt);
        for (let info of [
            produkt.name,
            produkt.ablaufDatum,
            produkt.notiz,
            iconString,
            produkt.heuteDatum
        ]) {
            let td = document.createElement("td");

            td.textContent = `${info}`;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }

    }

    function entferneKind(element: HTMLTableElement) { // entferntTabelleneintrag um neues zu speichern
        while (element.lastChild != document.getElementById("trTabelledetail")) {
            element.removeChild(element.lastChild);

        }
    }


    async function loescheProdukt(produkt: Produkt): Promise<void> { // entfernt das Produkt das geloescht werden soll ueber id
        await sendJSONStringWithPOST("http://127.0.0.1:3000/alleProdukte"
            , JSON.stringify({
                _id: produkt._id,   //reicht auch nur id, da in der <server Funktion nur id genutzt wird
                name: produkt.name,
                ablaufDatum: produkt.ablaufDatum,
                notiz: produkt.notiz,
                kategorie: produkt.kategorie,
                heuteDatum: produkt.heuteDatum
            }));
    }






}
