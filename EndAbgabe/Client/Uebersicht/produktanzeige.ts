
const urlproduktanzeige: string = "127.0.0.1"; //url
const pathproduktanzeige: string = "/alleProdukte";

namespace produktanzeige {

    interface Produkte {
        _id?: string;
        name: string;
        ablaufDatum: Date;
        notiz: string;
        heuteDatum: Date;
    }
    zeigeProdukte();

    async function frageProdukteAn(): Promise<Produkte[]> {
        let response: Response = await fetch(
            `http://localhost:3000/neueProdukte`
        );
        let text: string = await response.text();
        return JSON.parse(text) as Produkte[];
    }

    async function zeigeProdukte() {
        let produkte = await frageProdukteAn();
        console.log(produkte);
        let tbody: HTMLTableElement = document.getElementById("table") as HTMLTableElement;
        entferneKind(tbody);
        for (let produkt of produkte) {
            let tr = document.createElement("tr");
            tr.dataset.id = produkt._id;
            for (let info of [
                produkt.name,
                produkt.ablaufDatum
            ]) {
                let td = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }

    function entferneKind(element: HTMLTableElement) {
        while (element.lastChild != document.getElementById("wichtig")) {
          element.removeChild(element.lastChild);
    
        }
      }
}
