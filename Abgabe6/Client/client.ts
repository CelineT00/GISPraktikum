
namespace aufgabe {

    console.log("Client läuft");

    const url: string = "http://127.0.0.1:3000";
    const path: string = "/convertDate"

    const button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("enter");
    const ID: HTMLFormElement = <HTMLFormElement>document.getElementById("ID");
    const box: HTMLElement = <HTMLFormElement>document.getElementById("box");
    
    
    button.addEventListener("click", send);

     async function send(evt: Event): Promise<void> {
        evt.preventDefault(); 
        sendForm();

    }

    console.log(ID, button);

    async function requestTextWithGET(url: RequestInfo): Promise<string> {
        let response: Response = await fetch(url);
        let text: string = await response.text();
        return text;
      }

    async function sendForm(): Promise<void> {
        
        let formData: FormData = new FormData(ID);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let urlWithQuery: string = url + path + "?" + query.toString();

        let response: Response = await fetch(urlWithQuery);
        let responseText: string = await response.text();
        console.log(responseText);

        let text: HTMLElement = document.createElement("p");
        text.textContent = await requestTextWithGET(urlWithQuery);
        box.appendChild(text);
    }   
    
}