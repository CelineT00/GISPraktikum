import * as mongo from "mongodb"; 

namespace Aufgabe {
    let url: string = "mongodb://localhost:27017" //lokale MongoDB
    let mongoClient: mongo.MongoClient = new mongo.MongoClient(url);

    interface Event{
        _id?:mongo.ObjectId;
        interpret: string;
        preis: number;
        datum: Date;
        lecture_ids?:mongo.ObjectId[];
    }

    async function main() {
        await mongoClient.connect();
        const db: mongo.Db = mongoClient.db("läuft");
        const eventCollection: mongo.Collection = db.collection("Events");
    }

    

    let interpret: HTMLInputElement = <HTMLInputElement> document.getElementById("interpret") as HTMLInputElement;
    let preis: HTMLInputElement = <HTMLInputElement> document.getElementById("preis") as HTMLInputElement;
    let datum: HTMLInputElement = <HTMLInputElement> document.getElementById("zeit") as HTMLInputElement;
    let button: HTMLElement = document.getElementById("enter");
       
    console.log(interpret);

    button.addEventListener("click", () => { 
            let liste: HTMLElement = document.createElement("tr");
            let a: HTMLElement = document.createElement("td");
            let b: HTMLElement = document.createElement("td");
            let c: HTMLElement = document.createElement("td");
            let d: HTMLElement = document.createElement("td");
            let deletebutton: HTMLElement = document.createElement("button");
            deletebutton.innerText = "delete";
            document.getElementById("table").appendChild(liste);
            a.innerText = interpret.value;
            b.innerText = preis.value;
            c.innerText = datum.value;
            d.appendChild(deletebutton);
            liste.appendChild(a);
            liste.appendChild(b);
            liste.appendChild(c);
            liste.appendChild(d);
            deletebutton.addEventListener("click", deleter);

            function deleter (): void {
            document.getElementById("table").removeChild(liste);
            
        }
       
    });
}