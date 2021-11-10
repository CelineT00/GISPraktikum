// -- [Aufgabe 1]

/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
 let age: number = 21;

 /**
  * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
  */
 let firstName: string = `Celine`;
 
 function func1(age: number): number {
   return 2021 - age;
 }
 
 let output: string = func2(firstName);
 
 function func3(meal?: string): string {
   console.log(`Ich esse gerne ${meal || "Pizza"}.`);
   return func1(age) > 1995
     ? `Ich gehöre zur Generation Z`
     : `Ich gehöre zur Generation Y`;
 }
 
 console.log(output);
 
 function func2(name: string): string {
   console.log(`Ich heiße ${name}.`);
   return func3();
 }
 
 /* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
  * 1. ' Ich heisse Celine.'
  * 2. ' Ich esse gerne Pizza.'
  * 3. ' Ich gehöre zur Generation Z'
  */
 
 // -- [Aufgabe 2]
 
 let events: any[][] = [
   ["Mark Knopfler", 10.1],
   ["Pink Floyd", 15.9],
   ["Metallica", 20.1],
   ["Michael Bublé", 11.1],
   ["Dire Straits", 12.2],
   ["Mariah Carey", 1.1],
   ["Cat Stevens", 12.99],
   ["Mark Forster", 2.1],
   ["Helene Fischer", 3.1],
   ["Bee Gees", 25.2],
 ];
 
 // -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN
 
 // Lösung a) ...
let arraylength: number = events.length;
 console.log(arraylength);
 
 // Lösung b) ...
 console.log(events[0][0]);
 console.log(events[0][1]);
 console.log(events[1][0]);
 console.log(events[1][1]);
 console.log(events[2][0]);
 console.log(events[2][1]);
 console.log(events[3][0]);
 console.log(events[3][1]);
 console.log(events[4][0]);
 console.log(events[4][1]);
 console.log(events[5][0]);
 console.log(events[5][1]);
 console.log(events[6][0]);
 console.log(events[6][1]);
 console.log(events[7][0]);
 console.log(events[7][1]);
 console.log(events[8][0]);
 console.log(events[8][1]);
 console.log(events[9][0]);
 console.log(events[9][1]);

 // Lösung c) ...
 function groesstenummer (liste: number [][]): number {
   let groesste: number = 0;
   let nummer: number = 0;
   for (let i = 0; i < liste.length; i++) {
      if(liste[i][1]> groesste){
        groesste = liste[i][1];
        nummer = i;
      }     
   }
   console.log(`Die groesste Zahl ist ${groesste}`);
   return groesste;
 }
 groesstenummer(events);

 // Lösung d) ...
 function suchename(name: string, liste: string[][]): boolean {
  let vorhanden: boolean;
  let nummer: number = 0;
  for (let i: number = 0; i < liste.length; i++) {
    if (liste[i][0] == name) {
      vorhanden = true;
      nummer = i;
      break;
    }
  }
  if (vorhanden) {
    console.log(`Der Name ${name} ist vorhanden.`);
  } else {
    console.log(`Dieser Name ist nicht vorhanden.`);
  }
  return vorhanden;
}

// Lösung e)
function factorial(n: number): void {
  let i: number = 1;
  let ergebnis: number = 1;
  while (i <= n) {
    ergebnis *= i;
    i++;
  }
  console.log(ergebnis);
}
factorial(4);
factorial(5);
factorial(10);

 // Lösung f) ...
let ergebnis: number = 0;
for (let i: number = 0; i <= 100; i++) {
  let wahr: boolean = false;
  ergebnis = i / 3;
  let zahl: string = String(ergebnis);
  let zahl1: number = Number(zahl[0]);
  let zahl2: number = Number(zahl[1]);
  let zahlen: number = zahl1 + zahl2;
  let ergebnisse: number = zahlen / zahlen;   
  if (ergebnisse == 1 ) {
    wahr = true;
  } else {
    wahr = false;
  }
  if (wahr == true) {
    console.log(i);
  }
}

 // Lösung g) ...
 class ConcertEvents {
  price: number;
  interpret: string;
  constructor(price: number, interpret: string) {
    this.interpret = interpret;
    this.price = price;
  }

  public show(): void {
    console.log(`Der Preis ist ${this.price}.`);
    console.log(`Der Interpret ist ${this.interpret}.`);
  }
}

 // Lösung h) ...
let kuenstlerliste: ConcertEvents[];
for (let i: number = 0; i < events.length; i++) {
  let neu: ConcertEvents = new ConcertEvents(events[i][0], events[i][1]) ;
  kuenstlerliste.push(neu);
}
for (
  let i: number = 0; i < kuenstlerliste.length; i++) {
  kuenstlerliste[i].show() ;
  
}
 