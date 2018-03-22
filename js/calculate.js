let output = document.getElementById("output-text");
let buttonCount = document.getElementById("calculate-button");
let pickHour = document.getElementById("hour").selectedIndex;
let pickMin = document.getElementById("minute").value;
let zzz = document.getElementById("now");

let now = new Date();
let interval = 5400000; //one cycle = 1,5h - in milliseconds
let hours;
let mins;

//Rounding the milliseconds outcome
function rounding() {
  hours = Math.ceil((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  mins = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
}
//Fixing the data format after calculations 
function formatFix() {

  if (mins >= 60) {
    hours += 1;
    mins %= 60;
  }
  if (hours >= 24) {
    hours %= 24;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (mins < 10) {
    mins = '0' + mins;
  }
};

//Counting the best time to wake up between the cycles if you want to fall asleep now
function countCycles() {
  output.innerHTML = null;
  now = new Date();
  for (let i = 0; i < 6; i++) {
    now = new Date(now.getTime() + interval);
    rounding();
    mins += 14; //It takes 14 minutes in average 
    formatFix();
    output.innerHTML += 'Number of cycles: ' + [i + 1] + '<br>' + 'Wake up hour:  ' + hours + ":" + mins + '<br>' + "<br>";
  }
};
zzz.addEventListener('click', countCycles);

//Function calculating the best time to fall asleep if you want to wake up at a specified time
function calculate() {
  output.innerHTML = null;
  pickHour = document.getElementById("hour").selectedIndex;
  pickMin = document.getElementById("minute").value;

  if (pickHour === '0' || pickMin === '') {
    alert("ERROR. Pick the correct values.")
  } else {
    let time = pickHour * 3600000 + pickMin * 60000 + 54000000; //! explanation at the bottom
    output.innerHTML += "It would be best if you fall asleep at one the of following hours: " + "<br>";
    now = new Date().setTime(0); //setting time to 0 milliseconds
    now += time; //setting current time to be just the Hour and Minute user chose
    for (let i = 0; i < 4; i++) {
      formatFix1();
      output.innerHTML += hours + ":" + mins + "<br>";
      now += interval
    }
  }
};
buttonCount.addEventListener('click', calculate);

/* !In variable 'time'(line 74) I convert selected hour and minute to milliseconds 
    and I also add 15 hours, because here program have to calculate last 4 cycles of sleep
    so it's easier to add 15 hours and then count the intervals instead of going backwards with the intervals */
