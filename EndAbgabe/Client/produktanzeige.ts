
const urlproduktanzeige: string = "127.0.0.1"; //url
const pathproduktanzeige: string = "/alleProdukte";

namespace produktanzeige {

    class Produkte {
        _id? : string;
        name: string;
        ablaufDatum: Date;
        notiz: string;
        heuteDatum: Date;
    
        constructor(name: string, ablaufDatum: Date, notiz: string, heuteDatum: Date) {
          this.name = name;
          this.ablaufDatum = ablaufDatum;
          this.notiz = notiz;
          this.heuteDatum = heuteDatum;
        }
    
      }
    zeigeProdukte();

    async function frageProdukteAn(): Promise<Produkte[]> {
        let response: Response = await fetch(
            `http://localhost:3000/alleProdukte`
        );
        let text: string = await response.text();
        return JSON.parse(text) as Produkte[];
    }

    async function zeigeProdukte(){
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
                let tdbutton = document.createElement("td");
                let button = document.createElement("button");
                let link = document.createElement("a");
                button.innerText = "Detailansicht";
                button.addEventListener("enter",()=>{
                    localStorage.setItem("SpeichernDerDaten",JSON.stringify(produkt));
                });
                link.appendChild(button);
                link.setAttribute("href","detail.html");
                tdbutton.appendChild(link);
                td.textContent = `${info}`;
                tr.appendChild(tdbutton);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }

    function entferneKind(element: HTMLTableElement) {
        while (element.lastChild != document.getElementById("tr")) {
          element.removeChild(element.lastChild);
    
        }
      }
}
