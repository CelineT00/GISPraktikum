namespace aufgabe {
    let datum: HTMLInputElement = <HTMLInputElement>document.getElementById("datum") as HTMLInputElement;
    let dateElement: HTMLElement = document.getElementById("date");
    let requestElement: HTMLElement = document.getElementById("request");
    let box: HTMLElement =document.getElementById("box");

    requestElement.addEventListener("click", getStatus);
    dateElement.addEventListener("click", date);

    async function request(url: RequestInfo): Promise<string> {
        let response: Response = await fetch(url);
        let text: string = await response.text();
        return text;
    }
    async function requestPost(url: RequestInfo, data: Date): Promise<string> {
        let response: Response = await fetch(url,
            {
                method: "post",
                body: JSON.stringify(data),
            });
        let text: string = await response.text();

        return text;
    } 

    async function getStatus(): Promise<void> {
        let textContent = await request("http://localhost:3000/");
        console.log(textContent);
        
    }
    async function date(): Promise<void> {
        let textContent = await requestPost("http://localhost:3000/seeDate", new Date());
        console.log(textContent);
        
    }
}
