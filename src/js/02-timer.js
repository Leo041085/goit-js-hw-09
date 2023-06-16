import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  Picker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let time;
let countdown;

function updateTimer() {
  const timeLeft = countdown - Date.now();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) {
    clearInterval(time);
    Notiflix.Notify.success('Countdown timer is done !!!');
    refs.startBtn.disabled = false;
    return;
  }

  refs.days.textContent = days < 10 ? `0${days}` : days;
  refs.hours.textContent = hours < 10 ? `0${hours}` : hours;
  refs.minutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
  refs.seconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startTimer() {
  countdown = new Date(refs.Picker.value).getTime();
  if (countdown <= Date.now()) {
    Notiflix.Notify.warning('Сhoose another date !!!');
    return;
  }
  refs.startBtn.disabled = true;
  updateTimer();
  time = setInterval(updateTimer, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

flatpickr(refs.Picker, options);

refs.startBtn.addEventListener('click', startTimer);
