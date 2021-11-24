namespace Aufgabe {

    class Events {
        interpreten: string;
        preise: string;
        daten: string;

        constructor (interpreten: string, preise: string, datum: string) {
            this.interpreten = interpreten;
            this.preise = preise;
            this.daten = datum;
        }
        
    }
    let interpret: HTMLInputElement = <HTMLInputElement> document.getElementById("interpret") as HTMLInputElement;
    let preis: HTMLInputElement = <HTMLInputElement> document.getElementById("preis") as HTMLInputElement;
    let datum: HTMLInputElement = <HTMLInputElement> document.getElementById("zeit") as HTMLInputElement;
    let button: HTMLElement = document.getElementById("enter");
    


    let standartevent: Events = new Events("Twice", "44.2", "17.05.2022");
    let arrayevents: Events[] = [];
    arrayevents.push(standartevent);
    let localstoragearray: Events[];
    let localstoragestring: string = localStorage.getItem("myArray");
    localstoragearray = JSON.parse(localstoragestring);
    update();
    aktualisierenListe();
    let stringarray: string = JSON.stringify(arrayevents);
    localStorage.setItem("myArray", stringarray);

    function update(): void {
            for (let index: number = 0; index < localstoragearray.length; index++) {
        
                let liste: HTMLElement = document.createElement("tr");
                let a: HTMLElement = document.createElement("td");
                let b: HTMLElement = document.createElement("td");
                let c: HTMLElement = document.createElement("td");
                let d: HTMLElement = document.createElement("td");
                let deletebutton: HTMLElement = document.createElement("button");
                deletebutton.innerText = "delete";
                deletebutton.addEventListener("click", deleter);

                function deleter (): void {
                    document.getElementById("table").removeChild(liste);
                }


                document.getElementById("table").appendChild(liste);
                a.innerText = localstoragearray[index].interpreten;
                b.innerText = localstoragearray[index].preise;
                c.innerText = localstoragearray[index].daten;
                d.appendChild(deletebutton);
                liste.appendChild(a);
                liste.appendChild(b);
                liste.appendChild(c);
                liste.appendChild(d);

            }
    }
    function aktualisierenListe(): void {
            while (document.getElementById("table").lastChild != document.getElementById("wichtig")) {
                document.getElementById("table").removeChild( document.getElementById("table").lastChild);
                }

            for (let index: number = 0; index < arrayevents.length; index++) {
                let zeile: HTMLElement = document.createElement("tr");
                let a1: HTMLElement = document.createElement("td");
                let b1: HTMLElement = document.createElement("td");
                let c1: HTMLElement = document.createElement("td");
                let d1: HTMLElement = document.createElement("td");
                let deletebutton: HTMLElement = document.createElement("button");
                deletebutton.innerText = "delete";
                deletebutton.addEventListener("click", deleter);

                function deleter (): void {
                    document.getElementById("table").removeChild(zeile);
                }

                document.getElementById("table").appendChild(zeile);
                a1.innerText = arrayevents[index].interpreten;
                b1.innerText = arrayevents[index].preise;
                c1.innerText = arrayevents[index].daten;
                d1.appendChild(deletebutton);
                zeile.appendChild(a1);
                zeile.appendChild(b1);
                zeile.appendChild(c1);
                zeile.appendChild(d1);    
        }
    }
    button.addEventListener("click", () => { 
            let neuEvent: Events = new Events(interpret.value, preis.value, datum.value);
            arrayevents.push(neuEvent);

            aktualisierenListe();
            
            stringarray = JSON.stringify(arrayevents);
            localStorage.setItem("myArray", stringarray);
    });
    
}
