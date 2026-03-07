gsap.registerPlugin(ScrollTrigger);
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


