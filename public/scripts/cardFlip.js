var flipCards = document.querySelectorAll(".flip-card");
var playing = false;

flipCards.forEach(function(flipCard) {
  flipCard.addEventListener("click", () => {
    if (playing) return;

    playing = true;

    anime({
      targets: flipCard,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 400,
      complete: function (anim) {
        playing = false;
      }
    });
  });
});