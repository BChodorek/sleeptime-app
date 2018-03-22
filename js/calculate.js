let output = document.getElementById("output-text");
let buttonCount = document.getElementById("calculate-button");
let pickHour = document.getElementById("hour").selectedIndex;
let pickMin = document.getElementById("minute").value;
//let pickAMPM = document.getElementById("ampm").value;
let zzz = document.getElementById("now");

let now = new Date();
let hourInterval = 5400000; //1,5h in milliseconds
//let ampm;
let hours;
let mins;
let timeObj;


//Fixing the data right after calculations 
function formatFix1() {
  hours = Math.ceil((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); //ms to hours
  mins = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60) + 14); //ms to min +average time of falling asleep
  if (mins >= 60) {
    hours += 1;
    mins %= 60;
  }
  //  if (hours < 12) {
  //    ampm = 'Rano';
  //  } else {
  //    ampm = 'Popołudniu'
  //  }
  if (hours >= 24) {
    hours %= 24;
    ampm = 'Rano';
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (mins < 10) {
    mins = '0' + mins;
  }
}

function formatFix2() {

  hours = Math.floor((timeObj % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); //ms to hours
  mins = Math.floor((timeObj % (1000 * 60 * 60)) / (1000 * 60)); //ms to min +average time of falling asleep
  if (mins >= 60) {
    hours += 1;
    mins %= 60;
  }
  //  if (hours < 12) {
  //    ampm = 'Rano';
  //  } else {
  //    ampm = 'Popołudniu'
  //  }
  if (hours >= 24) {
    hours %= 24;
    ampm = 'Rano';
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (mins < 10) {
    mins = '0' + mins;
  }
  //  if (pickAMPM === "Rano") {
  //    ampm = "popołudniu";
  //  } else {
  //    ampm = "rano";
  //  }


}

//Counting the best time to wake up between the cycles if you want to fall asleep now
function countCycles() {
  output.innerHTML = null;
  now = new Date();
  for (let i = 0; i < 6; i++) {
    now = new Date(now.getTime() + hourInterval);
    formatFix1();
    output.innerHTML += 'Ilość cykli: ' + [i + 1] + '<br>' + 'Godzina pobudki:  ' + hours + ":" + mins + '<br>' + "<br>";
  }
};
zzz.addEventListener('click', countCycles);


//Funkcja kalkulująca cykle snu na podstawie danych podanych w tabelkach

function calculate() {
  output.innerHTML = null;
  pickHour = document.getElementById("hour").selectedIndex;
  pickMin = document.getElementById("minute").value;

  if (pickHour === '0' || pickMin === '') {
    alert("Błąd. Wybierz poprawne wartości")
  } else {
    let czas;
    czas = new Date()
    timeObj = czas.setTime(0);
    timeObj = czas.setTime(pickHour * 3600000 + pickMin * 60000);
    timeObj += 54000000;
    console.log(timeObj);
    /* formatFix2();
     console.log(hours, mins);*/

    for (let i = 0; i < 4; i++) {
      formatFix2();
      //      console.log(timeObj);
      output.innerHTML += "Połóż się spać o: " + hours + ":" + mins + "<br>" + "<br>";
      timeObj += hourInterval
    }

  }
}
buttonCount.addEventListener('click', calculate);
