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
    rangeEl[i].addEventListener("input", function (e) {
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

// Getting Start Modal
var openModalStart = document.querySelectorAll(".js-open-modal--start");
var modalStart = document.querySelector(".js-modal--start");
var closeModalStart = document.querySelector(".js-close-modal--start");
var toggleModalStart = function () {
    html.classList.toggle("scroll-lock");
    modalStart.classList.toggle("is-open-start__modal");
};

openModalStart.forEach((el, i) =>
    el.addEventListener("click", toggleModalStart)
);

closeModalStart.addEventListener("click", toggleModalStart);

// Calculator --- the approach is: how many times could the servers take the exact same workload? this is the waste.

function printTrees(count) {
    var cols = 4;
    var rows = 5;
    var html = '';
    while (rows-- > 0) {
        html += '<div class="results__trees-wrapper__row">\n';
        var remaindingCols = cols;
        while (remaindingCols-- > 0) {
            html += '<img class="thumb" src="./images/tree' + (count-- > 0 ? '' : '-active') + '.svg">\n'
        }
        html += '</div>'
    }
    $('#trees').html(html);
}

function results(source) {
    var usage = {
        0: 0, 10: 50, 20: 65, 30: 75, 40: 83, 50: 87, 60: 90, 70: 93, 80: 95, 90: 97, 100: 100
    };
    var country = {
        "DE": 516, "CH": 182, "SW": 30, "OTHER": 1000
    };

    var id = source.id;
    var serverCosts = document.getElementById("server-cost").value;
    var maxUsage = Math.max(document.getElementById("cpu-range").value, document.getElementById("memory-range").value);
    var cpuNum = $('#cores').val();

    var ecoMix = country[$('#country').val()] / 1000;

    var calc = document.querySelector("#calculator-form");
    var results = document.querySelector("#calculator-result");

    var savings = (Math.round((serverCosts * 100 / maxUsage - serverCosts) * 100) / 100).toFixed(2);
    var co2 = Math.floor(Math.round((0.3 * 3 * 8760 * ecoMix * cpuNum) * 100 / 100));

    printTrees(Math.round(co2 / 5000));

    if (id === "calculate" && serverCosts) {

        $.ajax({
            url: 'https://hooks.zapier.com/hooks/catch/3301335/ajm9hl/',
            type: 'post',
            dataType: 'json',
            data: $('#calcform').serialize(),
            success: function () {
                $('#savings').html(savings);
                $('#co2').html(co2);
                calc.style.display = "none";
                results.style.display = "flex";
            }
        });
    } else {
        calc.style.display = "flex";
        results.style.display = "none";
    }
}


// counter

$(function () {
    var idle = {
        0: 70, 1: 75, 2: 80, 3: 80, 4: 75, 5: 75, 6: 70, 7: 60, 8: 60, 9: 50, 10: 45, 11: 40,
        12: 50, 13: 45, 14: 40, 15: 35, 16: 40, 17: 45, 18: 40, 19: 50, 20: 55, 21: 60, 22: 70, 23: 75, 24: 70
    };
    var targetPercentage = idle[(new Date()).getHours()];
    var currentPercentage = 0;

    while (currentPercentage < targetPercentage) {
        currentPercentage++;

        // normalize the scala so it will always take the same amount of time until the counter reaches it's goal
        var currentFactor = currentPercentage * 100 / targetPercentage;

        // factor quadratically to get the visual effect of a counter that's slowing down
        setTimeout(function (currentPercentage) {
                $('#idlePercentage').html(currentPercentage);
            }, 1500 + Math.floor(currentFactor * currentFactor / 2) + currentPercentage, // add currentPercentage to avoid collision
            currentPercentage
        );
    }
});


// SMOOTH SCROLL
document.onclick = e => {
    var title = e.target.title;

    if (
        title === "calculator" ||
        title === "how-it-works" ||
        title === "our-vision" ||
        title === "start"
    ) {
        var str = e.target.title;

        document.querySelector("#" + str).scrollIntoView({behavior: "smooth"});
    }
};


//SUBMIT NEWSLETTER

// Regular Expression For Email
const emailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const error = false;

const submitNewsletterTop = () => {
    submitNewsletter(0, 'topForm');
    return false;
};

const submitNewsletterBottom = () => {
    submitNewsletter(2, 'bottomForm');
    return false;
};

const submitNewsletterModal = () => {
    submitNewsletter(1, window.interest);
    return false;
};

const submitNewsletter = (id, interest = 'unknown') => {
    var address = document.getElementById("email" + (id + 1)).value,
        label = document.getElementsByClassName("error-newsletter-js")[id],
        form = document.getElementsByClassName("newsletter-js")[id],
        success = document.getElementsByClassName("newsletter-result-js")[id];

    // Conditions
    if (address === "") {
        label.innerHTML = "Please provide your email!";
        return false;
    }

    if (error) {
        label.innerHTML = "Something went wrong! Please try again!";
        return false;
    }

    if (address !== "" && address.match(emailReg)) {
        $.ajax({
            url: 'https://hooks.zapier.com/hooks/catch/3301335/wl56s5/',
            type: 'post',
            dataType: 'json',
            data: {email: address, interest: interest},
            success: function () {
                form.style.display = "none";
                success.style.display = "flex";

                setTimeout(function () {
                    document.getElementById("email" + (id + 1)).value = '';
                    form.style.display = "flex";
                    success.style.display = "none";
                }, 5000);
            },
            error: function () {
                label.innerHTML = "Something went wrong! Please try again!";
            }
        });
        return true;
    }
    return false;
};
const cleanErrors = () => {
    Array.prototype.forEach.call(document.getElementsByClassName("error-newsletter-js"), item => {
        item.innerHTML = ""
    });
};


// ridiculously simple Spam protection
window.setTimeout($(function() {
    $('a[href^="mailto:"]').each(function() {
        this.href += 'helio.exchange';
    });
}), 500);

// GET STARS FROM GITHUB
async function getStarFromGit() {
    var gitCounter = document.getElementsByClassName("git-counter-js")[0];

    await fetch("https://api.github.com/repos/helio/setup")
        .then(res => res.json())
        .then(obj => {
            gitCounter.innerHTML = obj.stargazers_count;
        })
        .catch(() => {
            return "Unavailable";
        });
}

getStarFromGit();

// VIDEO PLAYER
var options = {
    id: 283189706,
    width: 700,
    playsinline: false
};

// Will create inside the video-js div:

var player = new Vimeo.Player("video-js", options);

// Get the modal
var modalWrapper = document.getElementById("modalVideo");

var img = document.getElementById("thumb");

var body = document.getElementsByTagName("body")[0];

function checkBodyScroll() {
    if (body.style.position === "fixed") {
        body.style.position = "initial";
    } else {
        body.style.position = "fixed";
        body.style.left = "0";
        body.style.right = "0";
    }
}

img.onclick = function () {
    checkBodyScroll();
    modalWrapper.style.display = "block";
    player.play();
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal-wrapper__close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    checkBodyScroll();
    modalWrapper.style.display = "none";
    player.pause();
};

window.onclick = function (event) {
    if (event.target === modalWrapper) {
        checkBodyScroll();
        modalWrapper.style.display = "none";
        player.pause();
    }
};
