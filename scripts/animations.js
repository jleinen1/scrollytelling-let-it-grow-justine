gsap.registerPlugin(ScrollTrigger);

// ch 1-seed spill interaction
const packet = document.querySelector(".seed-packet");
const seeds = document.querySelector(".seeds-scatter");

const seedTimeline = gsap.timeline({ paused: true });

seedTimeline
  // first: straighten upright from the resting tilt
  .to(packet, {
    rotation: 0,
    duration: 0.4,
    ease: "power2.out"
  })
  // then: flip upside down, pivoting from center
  .to(packet, {
    rotation: -160,
    transformOrigin: "center center",
    duration: 0.6,
    ease: "power2.inOut"
  })
  // seed drops out as bag flips past 90 degrees
  .fromTo(seeds,
    { opacity: 0, y: -10, x: 0 },
    { opacity: 1, y: 80, duration: 0.7, ease: "power2.in" },
    "-=0.3"
  )
  // seed settles with a small bounce
  .to(seeds, {
    y: 90,
    duration: 0.3,
    ease: "bounce.out"
  });

packet.addEventListener("click", () => {
  if (seedTimeline.progress() === 0 || seedTimeline.progress() === 1) {
    seedTimeline.restart();
  }
});

// ch 2 raindrops
gsap.fromTo("#ch2 .drops img",
  { y: -200, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#ch2",
      start: "top 70%",
      toggleActions: "play none none none"
    }
  }
);

// ch 3 watering can tip
gsap.timeline({
  scrollTrigger: {
    trigger: "#ch3",
    start: "top 70%",
    end: "bottom center",
    scrub: true
  }
})
  
// phase 1: slide left until over the sprout
.to(".watering-can", {
  x: -100,
  duration: 0.5,
  ease: "power1.inOut"
})
  
// phase 2: tip in place
.to(".watering-can", {
  rotation: -40,
  transformOrigin: "bottom right",
  duration: 0.5,
  ease: "power2.inOut"
});

// ch 4 - night/day theme toggle
const ch4 = document.querySelector("#ch4");
const toggleBtn = document.createElement("button");
toggleBtn.classList.add("day-night-toggle");
toggleBtn.innerHTML = `
  <svg class="icon-sun" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="7" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="20" y1="4" x2="20" y2="9" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="20" y1="31" x2="20" y2="36" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="4" y1="20" x2="9" y2="20" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="31" y1="20" x2="36" y2="20" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="28" y1="28" x2="31.5" y2="31.5" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="31.5" y1="8.5" x2="28" y2="12" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="12" y1="28" x2="8.5" y2="31.5" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
  <svg class="icon-moon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
    <path d="M13 8 C11 12, 10 16, 11 20 C12 26, 17 31, 23 31.5 C27 31.8, 30 30, 31 27 C26 27, 21 24, 18 19 C15 14, 14 11, 13 8 Z"
      stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>
`;

ch4.querySelector(".chapter-visual").appendChild(toggleBtn);

let isNight = false;

const dayToNight = gsap.timeline({ paused: true })
  .to("#ch4 .chapter-heading", { color: "#e8e0f0", duration: 0.5 })
  .to("#ch4 .chapter-label", { color: "#9b8ec4", duration: 0.5 }, "<")
  .to(toggleBtn, { backgroundColor: "#1a1740", borderColor: "#9b8ec4", duration: 0.5 }, "<");

toggleBtn.addEventListener("click", () => {
  isNight = !isNight;
  const sun = toggleBtn.querySelector(".icon-sun");
  const moon = toggleBtn.querySelector(".icon-moon");

  if (isNight) {
    sun.style.display = "none";
    moon.style.display = "block";
    ch4.classList.add("chapter--dark");
    dayToNight.play();
  } else {
    sun.style.display = "block";
    moon.style.display = "none";
    ch4.classList.remove("chapter--dark");
    dayToNight.reverse();
  }
});

// ch 5-flower bloom
gsap.from("#ch5 .base-flower", {
  scale: 0,
  transformOrigin: "bottom center",
  duration: 1.2,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#ch5",
    start: "top 70%",
    toggleActions: "play none none none"
  }
});

// ch 6
gsap.to("#ch6 .base-flower", {
  rotation: 2,
  duration: 3,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
  scrollTrigger: {
    trigger: "#ch6",
    start: "top 70%",
    toggleActions: "play none none none"
  }
});


