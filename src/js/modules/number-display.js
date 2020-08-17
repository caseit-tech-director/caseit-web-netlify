function numberCounter() {}

const NumberDisplay = {
  setup: function () {
    //let observer = new IntersectionObserver(callback, options);
    // grab all the hype text
    const allNumberElm = document.querySelectorAll(".number-display__number");
    const allTextElm = document.querySelectorAll(".number-display__text");

    // null check the all number elm
    if (!allNumberElm) return;

    const options = {
      // root: rootElm,
      rootMargin: "0px",
      threshold: 0.0,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        // start the text fade in
        if (entry.target.classList.contains("number-display__text")) {
          entry.target.classList.add("number-display__text--show");
          // remove the elment from the observe list so it wont be trigger again
          observer.unobserve(entry.target);
        }

        // add the counting state to number
        if (entry.target.classList.contains("number-display__number")) {
          if (!entry.target.classList.contains("counting")) {
            entry.target.classList.add("counting");
            const targetNumber = parseInt(entry.target.innerHTML);
            animateValue(entry.target, 0, targetNumber, 500);

            // remove the elment from the observe list so it wont be trigger again
            observer.unobserve(entry.target);
          }
        }
      });
    }, options);

    allNumberElm.forEach((elm) => {
      observer.observe(elm);
    });

    allTextElm.forEach((elm) => {
      observer.observe(elm);
    });
  },
};

function animateValue(elm, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = elm;
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

export default NumberDisplay;
