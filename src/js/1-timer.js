import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let countdownInterval;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const countdownInterval = userSelectedDate - new Date();

        if (countdownInterval < 0) {
               iziToast.error({
        color: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
            
            startBtn.disabled = true;
            inputTime.disabled = false;
        } else {
            startBtn.disabled = false;
            inputTime.disabled = true;
        }
    },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);
const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeValues = document.querySelectorAll('.value');

startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  countdownInterval = setInterval(() => {
    const timeInterval = userSelectedDate - new Date();
    
    if (timeInterval < 0) {
      clearInterval(countdownInterval);
      startBtn.disabled = true;
      inputTime.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeInterval);
    updateTimerDisplay({ days, hours, minutes, seconds });
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timeValues[0].textContent = String(days).padStart(2, '0');
  timeValues[1].textContent = String(hours).padStart(2, '0');
  timeValues[2].textContent = String(minutes).padStart(2, '0');
  timeValues[3].textContent = String(seconds).padStart(2, '0');
}