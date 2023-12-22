// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const dateTimePicker = flatpickr("#datetime-picker", options);
const startButton = document.querySelector('[data-start]');
const timerValues = document.querySelectorAll('.value');

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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


function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  timerValues[0].textContent = addLeadingZero(days);
  timerValues[1].textContent = addLeadingZero(hours);
  timerValues[2].textContent = addLeadingZero(minutes);
  timerValues[3].textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
  const selectedDate = dateTimePicker.selectedDates[0];
  const currentDate = new Date();


  if (selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }


  startButton.disabled = true;


  const timeDiff = selectedDate.getTime() - currentDate.getTime();

  const countdownInterval = setInterval(() => {
    updateTimerDisplay(timeDiff);

    if (timeDiff <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown completed!',
      });
    }

    timeDiff -= 1000; // віднімаємо 1 секунду
  }, 1000);
});
