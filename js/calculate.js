let pickHour = document.getElementById("hour").value;
let pickMin = document.getElementById("minute").value;
let pickAP = document.getElementById("ampm").value;
let output = document.getElementById("output-text")
let zzz = document.getElementById("now");

let hoursNow = new Date().getHours();
let minutesNow = new Date().getMinutes();

let hourTab = [];
let minutesTab = [];

//Kalkulacja cyklów na podstawie obecnego czasu
function cycles() {

  hoursNow = new Date().getHours();
  minutesNow = new Date().getMinutes();
  output.innerHTML = null;

  for (let i = 1; i < 7; i++) {
    let cycleHour = 0;
    let cycleMinute = 0;

    cycleHour += ((hoursNow + i) % 24);
    cycleMinute += ((minutesNow + (i * 30) + 15) % 60);
    hourTab.push(cycleHour);
    minutesTab.push(cycleMinute);
    output.innerHTML += 'Godzina pobudki:  ' + hourTab[i - 1] + ':' + minutesTab[i - 1] + '' + ". " + ' ' + ' Ilość cykli: ' + [i] + '<br>';
  }
};

zzz.addEventListener('click', cycles);


//Funkcja kalkulująca cykle snu na podstawie danych podanych w tabelce Hour Minut AM//PM
//function calculate() {}
