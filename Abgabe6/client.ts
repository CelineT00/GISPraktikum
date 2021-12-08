namespace aufgabe {
    let button: HTMLButtonElement = document.getElementById("enter")as HTMLButtonElement;
    //let ID: HTMLFormElement = document.getElementById("ID") as HTMLFormElement;
    //let date: HTMLInputElement = document.getElementById("date") as HTMLInputElement;
    //let div: HTMLDivElement = document.getElementById("box") as HTMLDivElement;
    
    button.addEventListener("enter", sending);

    async function sending(_event: Event): Promise<void> {
    let url: string = "http://127.0.0.1:3000/convertDate";
    let response: Response = await fetch(url);
    let variable: string = await response.text();
    console.log(variable);

    }
}