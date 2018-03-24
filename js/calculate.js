let output = document.getElementById("output-text");
let buttonCount = document.getElementById("calculate-button");
let pickHour = document.getElementById("hour");
let pickMin = document.getElementById("minute");
let zzz = document.getElementById("now");

let now = new Date();
let interval = 5400000; //one cycle = 1,5h - in milliseconds
let hours;
let mins;

//Rounding milliseconds when getting the time
function rounding() {
  hours = Math.ceil((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  mins = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
}
//Rounding milliseconds when setting the time see: calculate() 
function roundingSet() {
  hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  mins = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
}
//Fixing the date format after calculations 
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
    mins += 14; //It takes 14 minutes in average to fall asleep
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
  if (pickHour < 0 || pickMin === '') {
    alert("ERROR. Pick the correct values.")
  } else {
    let time = pickHour * 3600000 + pickMin * 60000;
    output.innerHTML += "It would be best if you fall asleep at one the of following hours: " + "<br>";
    now = new Date().setTime(0) + time + 54000000; /*setting time to 0 milliseconds, adding the Hour and Minute user chose
                                                     and 15 hours*(there's an explanation below why)*/
    for (let i = 0; i < 4; i++) {
      roundingSet();
      formatFix();
      output.innerHTML += hours + ":" + mins + "<br>";
      now += interval;
    }
  }
};
buttonCount.addEventListener('click', calculate);

/*  I add 15 hours to the time picked by user, because here program have to calculate last 4 cycles of sleep.
    So it's easier to add 15 hours and then count the intervals instead of going backwards with the intervals. */
