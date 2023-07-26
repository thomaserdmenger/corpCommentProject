// -- COUNTER COMPONENT --
const textAreaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");

const handleInput = () => {
  const limit = 150;
  const inputLength = textAreaEl.value.length;
  counterEl.textContent = limit - inputLength;
};

textAreaEl.addEventListener("input", handleInput);
