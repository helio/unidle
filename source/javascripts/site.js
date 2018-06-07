// This is where it all goes :)

var rangeEl = document.getElementsByClassName('js-range-item');

function updateRangeBar(e) {
  var min = e.target.min,
    max = e.target.max,
    val = e.target.value;

  e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function updateRangeValue(element, value) {
  var target = element.parentNode.getElementsByClassName('js-range-value')[0];
  target.innerHTML = value + '%';
}

for (var i = 0; i < rangeEl.length; i++) {
  rangeEl[i].addEventListener('input', function(e) {
    updateRangeBar(e);
    updateRangeValue(this, this.value);
  });
}
