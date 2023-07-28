// -- GLOBAL --
const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

const textAreaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

const renderListItem = (feedbackItem) => {
  const listItem = `
  <li class="feedback">
    <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
      <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class=""feedback__content>
      <p class="feedback__company">${feedbackItem.company}</p>
      <p class="feedback__text">${feedbackItem.text}</p>
    </div>
    <p class="feedback__date">${
      feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
    }</p>
  </li>
`;

  feedbackListEl.insertAdjacentHTML("beforeend", listItem);
};

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
  const text = textAreaEl.value;

  if (text.length > 5 && text.includes("#")) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textAreaEl.focus();
    return;
  }

  const upvoteCount = 0;
  const daysAgo = 0;

  const company = text
    .split(" ")
    .find((company) => company.includes("#"))
    .slice(1);

  const badgeLetter = company[0].toUpperCase();

  // Render feedback item in list
  const feebackItem = {
    upvoteCount: upvoteCount,
    badgeLetter: badgeLetter,
    company: company,
    text: text,
    daysAgo: daysAgo,
  };

  renderListItem(feebackItem);

  // Send feedback item to server => POST request
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feebackItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // Gurard clause
      if (!res.ok) {
        console.log("Something went wrong");
        return;
      }

      console.log("Successfully submitted");
    })
    .catch((error) => console.log(error));

  textAreaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", handleSubmit);

// -- FEEDBACK LIST COMPONENT --
fetch(`${BASE_API_URL}/feedbacks`)
  .then((res) => res.json())
  .then((data) => {
    spinnerEl.remove();

    data.feedbacks.forEach((item) => renderListItem(item));
  })
  .catch((error) => {
    // Failed to fetch feedback items. Error message: Failed to fetch
    feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
  });
