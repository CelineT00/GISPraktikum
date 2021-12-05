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
        nummer: number;
        constructor (person: string, preis: string, datum: string, nummer: number) {
            this.person = person;
            this.preis = preis;
            this.datum = datum;
            this.nummer = nummer;
        }
        returnID (): string {
            return this.nummer.toString();
        }   
    }

    let eventlist: Events[] = [];

    class Eventstoring {
        static eventsaving(): void {
            let stringEventListe: string = JSON.stringify(eventlist);
            localStorage.setItem("EventArray", stringEventListe);
        }
        static eventloading(): void {
            let storageStringListe: string = localStorage.getItem("EventArray") || "[]";
            while (table.lastChild != document.getElementById("wichtig")) {
                table.removeChild(table.lastChild);
                }

            for (let event of JSON.parse(storageStringListe)) {
                let liste: HTMLElement = document.createElement("tr");
                let a: HTMLElement = document.createElement("td");
                let b: HTMLElement = document.createElement("td");
                let c: HTMLElement = document.createElement("td");
                let d: HTMLElement = document.createElement("td");
                let deletebutton: HTMLElement = document.createElement("button");
                deletebutton.innerText = "delete";
                let buttonid: string = event.nummer.toString();
                deletebutton.id = buttonid;
                deletebutton.addEventListener("click", deleter);

                function deleter (): void {
                    let idbutt: number = parseInt(deletebutton.id);
                    eventlist = eventlist.filter(item => item.nummer !== idbutt);
                    localStorage.clear();
                    Eventstoring.eventsaving();
                    table.removeChild(liste);
                   
                }
                document.getElementById("table").appendChild(liste);
                a.innerText = event.person;
                b.innerText = event.preis;
                c.innerText = event.datum;
                d.appendChild(deletebutton);
                liste.appendChild(a);
                liste.appendChild(b);
                liste.appendChild(c);
                liste.appendChild(d);
            }
        }
    }
    Eventstoring.eventloading();

    button.addEventListener("click", () => { 
        if (interpret.value != "" && preis.value != "" && datum.value != "") {
            eventlist.length = 0;
            if (eventlist === null || eventlist.length < 1) {
               eventlist = JSON.parse(localStorage.getItem("EventArray"));
               
               if (eventlist === null || eventlist.length < 1) {
                    let neuEvent: Events = new Events(interpret.value, preis.value, datum.value, 0);
                    eventlist = [];
                    eventlist[0] = neuEvent;
                    
               } 
               else {
                let neuEvent: Events = new Events(interpret.value, preis.value, datum.value, (eventlist[eventlist.length - 1].nummer + 1));
                eventlist.push(neuEvent);
               }
            }else {
                let neuEvent: Events = new Events(interpret.value, preis.value, datum.value, (eventlist[eventlist.length - 1].nummer + 1));
                eventlist.push(neuEvent);
            }
            Eventstoring.eventsaving();
            Eventstoring.eventloading(); 
        }
    });
    
}    