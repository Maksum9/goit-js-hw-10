import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const delayInput = document.querySelector("[name='delay']");
  const stateInput = document.querySelector("[name='state']:checked");

  const delay = parseInt(delayInput.value, 10);
  const state = stateInput.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    (value) => {
      iziToast.success({
        title: "Fulfilled",
        message: `✅ Fulfilled promise in ${value}ms`,
        position: "topRight",
      });

      delayInput.value = "";
      stateInput.checked = false;
    },
    (reason) => {
      iziToast.error({
        title: "Rejected",
        message: `❌ Rejected promise in ${reason}ms`,
        position: "topRight",
      });

      delayInput.value = "";
      stateInput.checked = false;
    }
  );
});
