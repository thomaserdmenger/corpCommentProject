// -- GLOBAL --
const MAX_CHARS = 150;

const textAreaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

// -- COUNTER COMPONENT --
const handleInput = () => {
  const limit = MAX_CHARS;
  const inputLength = textAreaEl.value.length;
  counterEl.textContent = limit - inputLength;
};

textAreaEl.addEventListener("input", handleInput);

// -- FORM COMPONENT --
const showVisualIndicator = (textcheck) => {
  const className = textcheck === "valid" ? "form--valid" : "form--invalid";

  formEl.classList.add(className);
  setTimeout(() => formEl.classList.remove(className), 2000);
};

const handleSubmit = (event) => {
  event.preventDefault();
  let inputText = textAreaEl.value;

  if (inputText.length > 5 && inputText.includes("#")) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textAreaEl.focus();
    return;
  }

  const upvoteCount = 0;
  const daysAgo = 0;

  const companyName = inputText
    .split(" ")
    .find((company) => company.includes("#"))
    .slice(1);

  const badgeLetter = companyName[0].toUpperCase();

  let listItem = `
    <li class="feedback">
      <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upvoteCount}</span>
      </button>
      <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
      </section>
      <div class=""feedback__content>
        <p class="feedback__company">${companyName}</p>
        <p class="feedback__text">${inputText}</p>
      </div>
      <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
    </li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", listItem);
  textAreaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", handleSubmit);

// -- FEEDBACK LIST COMPONENT --
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((res) => res.json())
  .then((data) => {
    spinnerEl.remove();

    data.feedbacks.forEach((item) => {
      let fetchedListItem = `
        <li class="feedback">
          <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${item.upvoteCount}</span>
          </button>
          <section class="feedback__badge">
            <p class="feedback__letter">${item.badgeLetter}</p>
          </section>
          <div class=""feedback__content>
            <p class="feedback__company">${item.company}</p>
            <p class="feedback__text">${item.text}</p>
          </div>
          <p class="feedback__date">${
            item.daysAgo === 0 ? "NEW" : `${item.daysAgo}d`
          }</p>
        </li>`;

      feedbackListEl.insertAdjacentHTML("beforeend", fetchedListItem);
    });
  })
  .catch((error) => {
    // Failed to fetch feedback items. Error message: Failed to fetch
    feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
  });
