// This is where it all goes :)

var rangeEl = document.getElementsByClassName("js-range-item");

function updateRangeBar(e) {
  var min = e.target.min,
    max = e.target.max,
    val = e.target.value;

  e.target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

function updateRangeValue(element, value) {
  var target = element.parentNode.getElementsByClassName("js-range-value")[0];
  target.innerHTML = value + "%";
}

for (var i = 0; i < rangeEl.length; i++) {
  rangeEl[i].addEventListener("input", function(e) {
    updateRangeBar(e);
    updateRangeValue(this, this.value);
  });
}

// Open Modal
var openModal = document.querySelectorAll(".js-open-modal");
var closeModal = document.querySelector(".js-close-modal");
var html = document.getElementsByTagName("html")[0];

const modal = document.querySelector(".js-modal");
let openIndex;

const toggleModal = (e, i) => {
  e.preventDefault();
  if (i >= 0) {
    openIndex = i;
  }

  html.classList.toggle("scroll-lock");
  modal.classList.toggle(`is-open-${i >= 0 ? i : openIndex}`);
};

openModal.forEach((el, i) =>
  el.addEventListener("click", e => toggleModal(e, i))
);

closeModal.addEventListener("click", toggleModal);

// Calculator --- This code is just to demonstrate the result state

function results(source) {
  var id = source.id;
  var hasResults = document.getElementById("server-cost").value;
  var calc = document.querySelector(".calculator-js");
  var results = document.querySelector(".calculator-results-js");

  if (id === "calculate" && hasResults !== "") {
    calc.style.display = "none";
    results.style.display = "flex";
  } else {
    calc.style.display = "flex";
    results.style.display = "none";
  }
}

// SMOOTH SCROLL
document.onclick = e => {
  var title = e.target.title;

  if (
    title === "calculator" ||
    title === "how-it-works" ||
    title === "our-vision"
  ) {
    var str = e.target.title;

    document.querySelector("#" + str).scrollIntoView({ behavior: "smooth" });
  }
};

//SUBMIT NEWSLETTER --- This code is just to demonstrate the different states in the submission forms.

// Regular Expression For Email
const emailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

var label1 = document.getElementsByClassName("error-newsletter-js")[0];
var label2 = document.getElementsByClassName("error-newsletter-js")[1];
const error = false;

var newsletterForm1 = document.getElementsByClassName("newsletter-js")[0];
var newsletterForm2 = document.getElementsByClassName("newsletter-js")[1];

var sucess1 = document.getElementsByClassName("newsletter-result-js")[0];
var sucess2 = document.getElementsByClassName("newsletter-result-js")[1];

const submitNewsletterTop = () => {
  var email1 = document.getElementById("email1").value;

  // Conditions
  if (email1 === "") {
    label1.innerHTML = "Please write your email!";
    return false;
  }

  if (error) {
    label1.innerHTML = "Something went wrong! Please try again!";
    return false;
  }

  if (email1 !== "" && email1.match(emailReg)) {
    newsletterForm1.style.display = "none";

    sucess1.style.display = "flex";

    return false;
  }
  return false;
};

const submitNewsletterBottom = () => {
  var email2 = document.getElementById("email2").value;

  // Conditions
  if (email2 === "") {
    label2.innerHTML = "Please write your email!";
    return false;
  }

  if (error) {
    label2.innerHTML = "Something went wrong! Please try again!";
    return false;
  }

  if (email2 !== "" && email2.match(emailReg)) {
    newsletterForm2.style.display = "none";

    sucess2.style.display = "flex";

    return false;
  }
  return false;
};

const cleanErrors = () => {
  label1.innerHTML = "";
  label2.innerHTML = "";
};
