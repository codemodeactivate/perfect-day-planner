var flipCards1 = document.querySelectorAll("[id^='flip-card1-']");
var flipCards2 = document.querySelectorAll("[id^='flip-card2-']");
var playing = false;

flipCards1.forEach(function(flipCard1, index) {
  flipCard1.addEventListener("click", () => {
    if (playing || flipCard1.classList.contains("flip-card-null")) return;

    playing = true;

    anime({
      targets: flipCard1,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 400,
      complete: function (anim) {
        playing = false;
        flipCards2[index].classList.add("flip-card-null");
      }
    });
  });
});

flipCards2.forEach(function(flipCard2, index) {
  flipCard2.addEventListener("click", () => {
    if (playing || flipCard2.classList.contains("flip-card-null")) return;

    playing = true;

    anime({
      targets: flipCard2,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 400,
      complete: function (anim) {
        playing = false;
        flipCards1[index].classList.add("flip-card-null");
      }
    });
  });
});