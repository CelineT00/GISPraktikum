// -- [Aufgabe 1]
/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
var age = 21;
/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
var firstName = "Celine";
function func1(age) {
    return 2021 - age;
}
var output = func2(firstName);
function func3(meal) {
    console.log("Ich esse gerne " + (meal || "Pizza") + ".");
    return func1(age) > 1995
        ? "Ich geh\u00F6re zur Generation Z"
        : "Ich geh\u00F6re zur Generation Y";
}
console.log(output);
function func2(name) {
    console.log("Ich hei\u00DFe " + name + ".");
    return func3();
}
/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 * 1. ' Ich heisse Celine.?
 * 2. ' Ich esse gerne Pizza.'
 * 3. ' Ich gehöre zu Generation Z'
 */
// -- [Aufgabe 2]
var events = [
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
console.log(events.length);
console.log(["Namen", "Preise"].length);
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
var variable = events[0][1];
for (var i = 0; i < events.length; i++) {
    for (var j = 0; j < events.length; j++) {
        if (j > variable)
            j = variable;
    }
}
console.log(variable);
// Lösung d) ...
// Lösung e) ...
// Lösung f) ...
// Lösung g) ...
// Lösung h) ...
