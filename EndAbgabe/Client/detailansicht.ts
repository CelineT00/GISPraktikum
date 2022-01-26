const detailansichturl: string = "127.0.0.1"; //url
const detailanischtpath: string = "/einzelneProdukte";

namespace detailansicht {

    let bearbeitenButton: HTMLElement = document.getElementById("bearbeiten");
    let loeschenButton: HTMLElement = document.getElementById("loeschen");

    class Produkt {
        _id?: string;
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
    






}