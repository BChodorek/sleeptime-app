const date = {
    time: 0,
    interval: 5400000, // 1,5h in milliseconds
    hourNow: new Date().getHours(),
    minuteNow: new Date().getMinutes(),
    setTime: new Date().setTime(0),
    pickHour: document.getElementById('hour'),
    pickMin: document.getElementById('minute'),
    rounding(time) {
       hours =  Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    },
    formatFix() {
        if (minutes >= 60) {
          hours += 1;
          minutes %= 60;
        }
        if (hours >= 24) {
          hours %= 24;
        }
        if (hours < 10) {
          hours = '0' + hours;
        }
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
      }
    
};

const buttons = {
    calculateButton: document.getElementById('calculate-button'),
    zzz: document.getElementById('now')
};

const output = document.getElementById('output-text');





  Calculate = () => {
    output.innerHTML = null;
    pickHour = date.pickHour.selectedIndex;
    pickMin = date.pickMin.value;
    if(!valuesValidation(pickHour, pickMin)) { return false; };
        time = pickHour*3600000 + pickMin*60000;
        console.log(date.setTime);
        setTime = date.setTime + time + 54000000;
        output.innerHTML += "It would be best if you fall asleep at one the of following hours: " + "<br>" + "<br>";
        for(let i = 0; i < 4; i++){
            date.rounding(setTime);
            date.formatFix();
            output.innerHTML += "| " + hours + ":" + minutes + ' ';
            setTime += date.interval;
        }
        output.innerHTML += ' |';
}
buttons.calculateButton.addEventListener('click', Calculate);


CountCycles = ({hourNow, minuteNow}) => {
    time = 0;
    time = date.hourNow * 3600000 + date.minuteNow * 60000;
    output.innerHTML = 'Try to wake up at following hours in order to wake up rested: ' + "<br>" + "<br>";
    for(let i = 0; i < 6; i++) {
        time += date.interval
        date.rounding(time);
        minutes += 14;
        date.formatFix();
        output.innerHTML += ' ' + '| ' + hours + ":" + minutes + ' ';
    }
    output.innerHTML += ' |';
};
buttons.zzz.addEventListener('click', CountCycles);

valuesValidation = (pickHour, pickMin) => {
    if (pickHour < 0 || pickMin === '') {
        alert("ERROR. Pick the correct values.");
        return false;
    } else {
        return true;
    }
};


