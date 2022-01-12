
const url: string = "127.0.0.1"; //url
const path: string = "/concertEvents";

namespace Client {

  displayEvents();

  let interpret: HTMLInputElement = <HTMLInputElement>document.getElementById("interpret") as HTMLInputElement;
  let preis: HTMLInputElement = <HTMLInputElement>document.getElementById("preis") as HTMLInputElement;
  let datum: HTMLInputElement = <HTMLInputElement>document.getElementById("datum") as HTMLInputElement;
  let button: HTMLElement = document.getElementById("enter");

  interface Concerts {
    _id?: string;
    interpret: string;
    preis: number;
    datum: Date;
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

  console.log(interpret);

  button.addEventListener("click", () => {

    sendJSONStringWithPOST(
      "http://localhost:3000/concertEvents",
      JSON.stringify({
        Interpret: interpret.value,
        Preis: preis.value,
        Datum: datum.value

      })
    );
    displayEvents();

  });

  async function requestConcerts(): Promise<Concerts[]> {
    let response: Response = await fetch(
      `http://localhost:3000/concertEvents`
    );
    let text: string = await response.text();
    return JSON.parse(text) as Concerts[];
  }

  async function displayEvents() {
    let events = await requestConcerts();
    console.log(events);
    let tbody: HTMLTableElement = document.getElementById("table")as HTMLTableElement;
    removeChildren(tbody);
    for (let event of events) {
        let tr = document.createElement("tr");
        tr.dataset.id = event._id;
        for (let info of [
            event.interpret,
            event.preis,
            event.datum,
        ]) {
            let td = document.createElement("td");
            td.textContent = `${info}`;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }
}

/* zweiter versuch9funktioniert auch nicht
  async function displayEvents() {
    let events: Concerts[] = await requestConcerts();
    console.log(events);
    let tbody: HTMLTableElement = <HTMLTableElement>document.getElementById("table");
    removeChildren(tbody);
    for (let event of events) {
      let loadedevent: Concerts = {
        interpret : event.interpret,
        preis : event.preis,
        datum: event.datum
      }
        let tr: HTMLTableRowElement = document.createElement("tr");
      //Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'toString')tr.dataset.id = event._id;
      let interpret: HTMLTableCellElement = document.createElement("td");
      let price: HTMLTableCellElement = document.createElement("td");
      let date: HTMLTableCellElement = document.createElement("td");
      interpret.innerHTML = loadedevent.interpret.toString();
      price.innerHTML = loadedevent.preis.toString();
      date.innerHTML = loadedevent.datum.toString();

      tr.appendChild(interpret);
      tr.appendChild(price);
      tr.appendChild(date);
      tbody.appendChild(tr);

    }
  }
  */


  function removeChildren(element: HTMLTableElement) {
    while (element.lastChild != document.getElementById("wichtig")) {
      element.removeChild(element.lastChild);

    }
  }

}