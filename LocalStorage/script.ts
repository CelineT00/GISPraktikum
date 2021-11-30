namespace Aufgabe {
    let interpret: HTMLInputElement = <HTMLInputElement> document.getElementById("interpret") as HTMLInputElement;
    let preis: HTMLInputElement = <HTMLInputElement> document.getElementById("preis") as HTMLInputElement;
    let datum: HTMLInputElement = <HTMLInputElement> document.getElementById("zeit") as HTMLInputElement;
    let button: HTMLButtonElement = document.getElementById("enter") as HTMLButtonElement;
    let table: HTMLTableElement = document.getElementById("table") as HTMLTableElement;

    class Events {
        person: string;
        preis: string;
        datum: string;
        id: number;
        constructor (person: string, preis: string, datum: string, id: number) {
            this.person = person;
            this.preis = preis;
            this.datum = datum;
            this.id = id;
        }
        returnID (): string {
            return this.id.toString();
        }

        
    }

    let eventlist: Events[] = [];
    class EventStorage {
        static eventsaves(): void {
            let stringEventListe: string = JSON.stringify(eventlist);
            localStorage.setItem("EventArray", stringEventListe);
        }
        static eventloading(): void {
            let storageStringListe: string = localStorage.getItem("EventArray") || "[]";
            while (table.lastChild != document.getElementById("wichtig")) {
                table.removeChild(table.lastChild);
                }

            for (let evt of JSON.parse(storageStringListe)) {
                let zaehler: number = 0;
                let liste: HTMLElement = document.createElement("tr");
                let a: HTMLElement = document.createElement("td");
                let b: HTMLElement = document.createElement("td");
                let c: HTMLElement = document.createElement("td");
                let d: HTMLElement = document.createElement("td");
                let deletebutton: HTMLElement = document.createElement("button");
                deletebutton.innerText = "delete";
                let buttonid: string = zaehler.toString();
                deletebutton.id = buttonid;
                deletebutton.addEventListener("click", deleter);

                function deleter (): void {
                    eventlist.forEach((event, index) => {
                        if (event.returnID() == deletebutton.id) {
                            eventlist.splice(index, 1);
                        }
                    });
                    EventStorage.eventsaves();
                    table.removeChild(liste);
                }

                document.getElementById("table").appendChild(liste);
                a.innerText = evt.person;
                b.innerText = evt.preis;
                c.innerText = evt.datum;
                d.appendChild(deletebutton);
                liste.appendChild(a);
                liste.appendChild(b);
                liste.appendChild(c);
                liste.appendChild(d);

                zaehler++;

            }
        }
    }
    EventStorage.eventloading();

    button.addEventListener("click", () => { 
            let neuEvent: Events = new Events(interpret.value, preis.value, datum.value, eventlist.length);
            eventlist.push(neuEvent);
           EventStorage.eventsaves();
           EventStorage.eventloading();
       
    });
    
}
/*
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
       
    }); */