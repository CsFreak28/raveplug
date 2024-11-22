let counter = 1;

const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const counterValue = document.getElementById("counter-value");

// Decrease counter value when minus button is clicked, but not below 1
minusBtn.addEventListener("click", function () {
  if (counter > 1) {
    counter--;
    counterValue.textContent = counter;
  }
});

// Increase counter value when plus button is clicked
plusBtn.addEventListener("click", function () {
  counter++;
  counterValue.textContent = counter;
});
