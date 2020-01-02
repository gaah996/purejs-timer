var interval = null;

function initScreen(animate) {
  let date = JSON.parse(localStorage.getItem('date'));

  if(date) {
    handleTransition(animate, 'timer');
    initTimer(date.year, date.month, date.day, date.hour, date.minute, date.second);
  } else {
    handleTransition(animate, 'config');
    if(interval) clearInterval(interval);
  }
}

function handleTransition(animate, screen) {
  let configScreen = document.querySelector('#config');
  let timerScreen = document.querySelector('#timer');

  if(screen == 'timer') {
    let timeout = 0;
    if(animate) {
      configScreen.classList.add('card-leave');
      timerScreen.classList.add('timer-enter');
      timeout = 1000;
    }

    timerScreen.classList.remove('hide');
    setTimeout(() => {
      configScreen.classList.add('hide');

      configScreen.classList.remove('card-leave');
      timerScreen.classList.remove('timer-enter');
    }, timeout);
  } else {
    let timeout = 0;
    if(animate) {
      configScreen.classList.remove('hide');
      configScreen.classList.add('card-enter');
      timerScreen.classList.add('timer-leave');
      timeout = 1000;
    }

    configScreen.classList.remove('hide');
    setTimeout(() => {
      timerScreen.classList.add('hide');

      configScreen.classList.remove('card-enter');
      timerScreen.classList.remove('timer-leave');
    }, timeout);
  }
}

function setDate(e) {
  e.preventDefault();

  let date = document.querySelector('#future-date').value;
  let hour = document.querySelector('#future-hour').value || 0;
  let minute = document.querySelector('#future-minute').value || 0;
  let second = document.querySelector('#future-second').value || 0;

  let dateObj = {
    year: date.substring(0, 4),
    month: date.substring(5, 7),
    day: date.substring(8),
    hour, minute, second
  };

  localStorage.setItem('date', JSON.stringify(dateObj));
  initScreen(true);
}

function resetTimer() {
  localStorage.removeItem('date');
  initScreen(true);
}

function initTimer(year, month, day, hour, minute, second) {
  var counter = document.querySelector('#counter');

  interval = setInterval(() => {
    let text = timer(year, month, day, hour, minute, second);

    if(text) {
      counter.innerHTML = text;
    } else {
      counter.innerHTML = window.langText['timer-end'];
      clearInterval(interval);
    }
  }, 250);
}

function timer(year, month, day, hour, minute, second) {
  let now = new Date();
  let future = new Date(year, month - 1, day, hour, minute, second);

  let remaining = parseInt((future - now) / 1000);
  
  let rDays = Math.floor(remaining / 86400);
  let rHours = Math.floor((remaining - rDays * 86400) / 3600);
  let rMinutes = Math.floor((remaining - rDays * 86400 - rHours * 3600) / 60);
  let rSeconds = Math.floor(remaining - rDays * 86400 - rHours * 3600 - rMinutes * 60);

  if(remaining > 0) {
    return (rDays > 0) ? `${rDays}d ${rHours}h ${rMinutes}m ${rSeconds}s` : 
      (rHours > 0) ? `${rHours}h ${rMinutes}m ${rSeconds}s` :
      (rMinutes > 0) ? `${rMinutes}m ${rSeconds}s` :
      (rSeconds > 0) ? `${rSeconds}s` : false;
  }

  return false;
}