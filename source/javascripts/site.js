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

// Calculator

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
