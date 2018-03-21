let pickHour = document.getElementById("hour").value;
let pickMin = document.getElementById("minute").value;
let pickAP = document.getElementById("ampm").value;
let output = document.getElementById("output-text")
let zzz = document.getElementById("now");

let hourNow = new Date().getHours();
let minutesNow = new Date().getMinutes();

let hourTab = [1, 3, 4, 6, 7, 9];
let minutesTab = [30, 00];

//Kalkulacja cyklów na podstawie obecnego czasu
function cycles() {
  output.innerHTML = null;
  hoursNow = new Date().getHours();
  minutesNow = new Date().getMinutes();
  for (let i = 0; i < hourTab.length; i++) {

    let cycleHour = 0;
    let cycleMinutes = 0;
    cycleHour += ((hourNow + hourTab[i]) % 24);
    cycleMinutes += (minutesNow + minutesTab[i % 2] + 14);

    function formatFix() {
      if (cycleMinutes >= 60) {
        cycleHour += 1;
        cycleMinutes = cycleMinutes % 60;
      }

      if (cycleHour < 10) {
        cycleHour = '0' + cycleHour;
      }
      if (cycleMinutes < 10) {
        cycleMinutes = '0' + cycleMinutes;
      }
    }

    formatFix();
    output.innerHTML += 'Godzina pobudki:  ' + cycleHour + ':' + cycleMinutes + ". " + ' ' + ' Ilość cykli: ' + [i] + '<br>';
  }
};

zzz.addEventListener('click', cycles);


//Funkcja kalkulująca cykle snu na podstawie danych podanych w tabelce Hour Minut AM//PM
//function calculate() {}
