namespace ClientAnlegen {

  let heutigesDatum: Date = new Date(); //heutigesDatum
  let name: HTMLInputElement = <HTMLInputElement>document.getElementById("name") as HTMLInputElement;
  let ablaufDatum: HTMLInputElement = <HTMLInputElement>document.getElementById("ablaufdatum") as HTMLInputElement;
  let notiz: HTMLInputElement = <HTMLInputElement>document.getElementById("notiz") as HTMLInputElement;
  let kategorie: HTMLInputElement = <HTMLInputElement>document.getElementById("kategorie") as HTMLInputElement;
  let button: HTMLElement = document.getElementById("enter") as HTMLElement;

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

  produktDarstellen();

  async function sendJSONStringWithPOST( //sendet einen JSONString mit der Post Methode im Server
    url: RequestInfo,
    jsonString: string
  ): Promise<void> {
    await fetch(url, {
      method: "post",
      body: jsonString,
    });
  }

  async function ladeProdukt(): Promise<Produkt> { // ladet Produkt in den LocaleSTorage 
    let storageStringListe: string = localStorage.getItem("SpeichernDerDaten") || "[]";
    let arrayLadeProdukt: Produkt[] = [];
    arrayLadeProdukt[0] = JSON.parse(storageStringListe);
    return arrayLadeProdukt[0];
  }

  async function hinzufuegenoderBearbeiten(): Promise<void> { //wenn Datei im LocalStorage sendet diese an Server sonst sendet alle  Daten an Server
    if (localStorage.getItem("SpeichernDerDaten")) {
      let detailAnsichtProdukt: Produkt = await ladeProdukt();
      sendJSONStringWithPOST(
        "http://127.0.0.1:3000/neueProdukte",
        JSON.stringify({
          _id: detailAnsichtProdukt._id,
          name: name.value,
          ablaufDatum: ablaufDatum.value,
          notiz: notiz.value,
          heuteDatum: heutigesDatum,
          kategorie: kategorie.value
        })
      );
    }
    else {
      sendJSONStringWithPOST(
        "http://127.0.0.1:3000/neueProdukte",
        JSON.stringify({
          _id: "",
          name: name.value,
          ablaufDatum: ablaufDatum.value,
          notiz: notiz.value,
          heuteDatum: heutigesDatum,
          kategorie: kategorie.value
        })
      );
    }
  }

  async function produktDarstellen(): Promise<void> { //zeigt das Produkt in der Tabelle an
    let detailAnsichtProdukt: Produkt = await ladeProdukt();
    if (detailAnsichtProdukt.name) {
      name.value = detailAnsichtProdukt.name;
      ablaufDatum.value = detailAnsichtProdukt.ablaufDatum.toString();
      notiz.value = detailAnsichtProdukt.notiz;
      kategorie.value = detailAnsichtProdukt.kategorie;
    }
  }

  button.addEventListener("click", () => { //was der button macht, wenn er gedrueckt wird
    hinzufuegenoderBearbeiten();
  });


}