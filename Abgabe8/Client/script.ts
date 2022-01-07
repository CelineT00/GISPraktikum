
  const url: string = "127.0.0.1"; //url
  const path: string = "/concertEvents"; 
    
namespace Client {

   let interpret: HTMLInputElement = <HTMLInputElement> document.getElementById("interpret") as HTMLInputElement;
   let preis: HTMLInputElement = <HTMLInputElement> document.getElementById("preis") as HTMLInputElement;
   let datum: HTMLInputElement = <HTMLInputElement> document.getElementById("datum") as HTMLInputElement;
   let button: HTMLElement = document.getElementById("enter");

    interface Concerts{
        _id?:string;
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
         
      });

      async function requestConcerts(): Promise<Concerts[]> {
        let response: Response = await fetch(
          `http://localhost:3000/concertEvents?concerts`
          );
        let text: string = await response.text();
        return JSON.parse(text) as Concerts[];
      }


      async function displayEvents(table: HTMLTableElement) {
        let events: Concerts[] = await requestConcerts();
        let tbody: HTMLElement = <HTMLElement>table.querySelector("tbody");
        removeChildren(tbody);
        for (let event of events) {
          let tr: HTMLTableRowElement = document.createElement("tr");
          tr.dataset.id = event._id;
          for (let info of [
            event.interpret,
            event.preis,
            event.datum,
          ]) {
            let td: HTMLElement = document.createElement("td");
            td.textContent = `${info}`;
            tr.appendChild(td);
          }
        }
      }

      function removeChildren(element: HTMLElement) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    
}