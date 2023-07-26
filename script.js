// -- GLOBAL --
const textAreaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const feedbackListEl = document.querySelector(".feedbacks");
const formEl = document.querySelector(".form");

// -- COUNTER COMPONENT --
const handleInput = () => {
  const limit = 150;
  const inputLength = textAreaEl.value.length;
  counterEl.textContent = limit - inputLength;
};

textAreaEl.addEventListener("input", handleInput);

// -- FORM COMPONENT --
const handleSubmit = (event) => {
  event.preventDefault();
  let inputText = textAreaEl.value;
  let listItem = `<li>${inputText}</li>`;

  if (inputText.length > 5 && inputText.includes("#")) {
    formEl.classList.add("form--valid");
    setTimeout(() => formEl.classList.remove("form--valid"), 2000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => formEl.classList.remove("form--invalid"), 2000);
    textAreaEl.focus();
    return;
  }

  feedbackListEl.insertAdjacentHTML("beforeend", listItem);
  textAreaEl.value = "";
};

formEl.addEventListener("submit", handleSubmit);
