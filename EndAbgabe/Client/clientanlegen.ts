const urlclientanlegen: string = "127.0.0.1"; //url
const pathclientanlegen: string = "/neueProdukte";

namespace ClientAnlegen {

  let heutigesDatum: Date = new Date();
  let name: HTMLInputElement = <HTMLInputElement>document.getElementById("name") as HTMLInputElement;
  let ablaufDatum: HTMLInputElement = <HTMLInputElement>document.getElementById("ablaufdatum") as HTMLInputElement;
  let notiz: HTMLInputElement = <HTMLInputElement>document.getElementById("notiz") as HTMLInputElement;
  let button: HTMLElement = document.getElementById("enter");
  let ablaufDatumProdukt: Date = new Date(ablaufDatum.value);
  let form : HTMLFormElement = <HTMLFormElement> document.getElementById("formanlegen");

  class Produkt {
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
      "http://localhost:3000/neueProdukte",
      JSON.stringify({
        name: name.value,
        ablaufDatum: ablaufDatum.value,
        notiz: notiz.value,
        heuteDatum: heutigesDatum
      })
    );
  });
  
/*
  async function findeProdukt(id: string): Promise<Produkt[]> {
    let response: Response = await fetch(`http://localhost:3000/einzelneProdukte?_id=${id}`);
    let text: string = await response.text();
    return JSON.parse(text) as Produkt[];
  }

  async function frageProdukteAn(): Promise<Produkt[]> {
    let response: Response = await fetch(
        `http://localhost:3000/alleProdukte`
    );
    let text: string = await response.text();
    return JSON.parse(text) as Produkt[];
}

  async function produktEditieren(event : Event){
      event.preventDefault();
      let produktArray: Produkt[] = await frageProdukteAn();
      
  }

  async function editiereProdukt(event: Event) {
    let target: HTMLElement = <HTMLElement>event.currentTarget;
    let neuesprodukt: Produkt = (await findeProdukt(_id? || ""))[0];
    neuesprodukt = neuesprodukt || {
      _id: "",
      name: "",
      ablaufDatum: heutigesDatum,
      notiz: "",
      heuteDatum: heutigesDatum,
    };
    for (let info of [
      ["_id", neuesprodukt._id],
      ["name", neuesprodukt.name],
      ["ablaufDatum", neuesprodukt.ablaufDatum],
      ["notiz", neuesprodukt.notiz],
      ["heuteDatum", neuesprodukt.heuteDatum],
    ]) {
      let input: HTMLElement = <HTMLElement>document.querySelector(`#${info[0]}`);
    }
  }*/


}