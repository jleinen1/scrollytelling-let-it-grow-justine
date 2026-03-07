gsap.registerPlugin(ScrollTrigger);

// ch 1-seed spill interaction

const packet = document.querySelector(".seed-packet");
const seeds = document.querySelector(".seeds-scatter");

const seedTimeline = gsap.timeline({ paused: true });

seedTimeline
  .to(packet, {
    rotation: 40,
    duration: 0.6,
    ease: "power2.out"
  })
  .fromTo(seeds,
    {
      y: -20,
      opacity: 0
    },
    {
      y: 80,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    },
    "-=0.2"
  );

packet.addEventListener("click", () => {
  seedTimeline.play();
});

// ch 2 raindrops
gsap.from("#ch2 .drops img", {
  y: -200,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#ch2",
    start: "top 70%"
  }
});

// watering can slide
gsap.timeline({
  scrollTrigger: {
    trigger: "#ch3",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
})

.to(".watering-can", {
  x: -200
})

.from("#ch3 .base-sprout", {
  scale: 0,
  transformOrigin: "bottom center",
  ease: "back.out(1.7)"
}, "<");


// ch 4-night/day theme toggle

// ch 5-flower bloom
gsap.from("#ch5 .base-flower", {
  scale: 0,
  transformOrigin: "bottom center",
  duration: 1.2,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#ch5",
    start: "top 70%"
  }
});

// ch 6-final garden sway loop
gsap.to("#ch6 .base-flower", {
  rotation: 2,
  duration: 3,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});


