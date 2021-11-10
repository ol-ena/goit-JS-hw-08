const form = document.querySelector(".feedback-form");
const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');
var throttle = require('lodash.throttle');
form.addEventListener("input", throttle(handleInput, 500));
function handleInput(event) {
  const {
    elements: { email, message }
  } = event.currentTarget;
  const feedback = {
    email: email.value,
    message: message.value
  };
  localStorage.setItem("feedback-form-state", JSON.stringify(feedback));
}
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message }
  } = event.currentTarget;
  const feedback = {
    email: email.value,
    message: message.value
  };
  if (email.value === "" || message.value === "") {
    return console.log("Please fill in all the fields!");
  }
  console.log(feedback);
  localStorage.removeItem("feedback-form-state");
  emailInput.value='';
  messageInput.value='';
  event.currentTarget.reset();
}
initForm();
function initForm(){
    const savedSettings = localStorage.getItem("feedback-form-state");
    if (savedSettings == null) return
    const parsedSettings = JSON.parse(savedSettings);
    emailInput.value = parsedSettings.email;
    messageInput.value = parsedSettings.message;
}