const urlclientanlegen: string = "127.0.0.1"; //url
const pathclientanlegen: string = "/neueProdukte";

namespace ClientAnlegen{

    let heutigesDatum: Date = new Date();
    let datumFormatiert: string = heutigesDatum.toLocaleDateString(); // passendes Format für Anzeige
    let name: HTMLInputElement = <HTMLInputElement>document.getElementById("name") as HTMLInputElement;
    let ablaufDatum: HTMLInputElement = <HTMLInputElement>document.getElementById("ablaufdatum") as HTMLInputElement;
    let ablaufDatumString: Date = ablaufDatum.toLocaleDateString();
    let ablaufDatumFormatiert: string  = ablaufDatumString.toLocalDateString();
    let notiz: HTMLInputElement = <HTMLInputElement>document.getElementById("notiz") as HTMLInputElement;
    let button: HTMLElement = document.getElementById("enter");

    interface NeuesProdukt{
        _id?: string;
        name: string;
        ablaufDatum: Date;
        notiz: string;
        heuteDatum: Date;
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

    button.addEventListener("click", () => {

        sendJSONStringWithPOST(
          "http://localhost:3000/",
          JSON.stringify({
            name: name.value,
            ablaufDatum: ablaufDatum.value,
            notiz: notiz.value,
            heuteDatum: heutigesDatum
          })
        );
      });

      async function findeProdukt(id: string): Promise<NeuesProdukt[]> {
        let response: Response = await fetch(`http://localhost:3000/alleProdukte?_id=${id}`);
        let text: string = await response.text();
        return JSON.parse(text) as NeuesProdukt[];
      }

      async function editiereProdukt(event: Event) {
        let target: HTMLElement = <HTMLElement>event.currentTarget;
        let neuesprodukt: NeuesProdukt = (await findeProdukt(target.dataset?.id || ""))[0];
        neuesprodukt = neuesprodukt || {
          _id: "",
          name: "",
          ablaufDatum: HTMLInputElement,
          notiz: "",
          heuteDatum: datumFormatiert, 
        };
        for(let info of[
          ["_id", neuesprodukt._id],
          ["name", neuesprodukt.name],
          ["ablaufDatum", neuesprodukt.ablaufDatum],
          ["notiz", neuesprodukt.notiz],
          ["heuteDatum", neuesprodukt.heuteDatum],
        ])
        {
          let input: HTMLElement = <HTMLElement>document.querySelector(`#${info[0]}`);
        }
      }

    
}