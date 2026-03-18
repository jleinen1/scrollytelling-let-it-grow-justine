gsap.registerPlugin(ScrollTrigger);

// ─── reduced-motion check ─────────────────────────────────────────────────────
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── hero entrance ───────────────────────────────────────────────────────────
// Three tweened steps:
//   Step 1 — eyebrow fades in
//   Step 2 — title lines slide up one by one (clip reveal)
//   Step 3 — subtitle + CTA fade up together

if (prefersReduced) {
  gsap.set([
    ".hero-eyebrow",
    ".hero-title-line",
    ".hero-subtitle",
    ".hero-cta",
    ".hero-seed-packet",
    ".hero-sprout"
  ], { opacity: 1, y: 0, rotation: 10 });
} else {
  const heroEntrance = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Step 1: eyebrow
  heroEntrance.fromTo(
    ".hero-eyebrow",
    { opacity: 0, y: 14 },
    { opacity: 0.45, y: 0, duration: 0.5 }
  );

  // Step 2: title lines clip-reveal upward, staggered
  heroEntrance.fromTo(
    ".hero-title-line",
    { y: "105%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.7, stagger: 0.15 },
    "-=0.15"
  );

  // Step 3: subtitle then CTA
  heroEntrance.fromTo(
    ".hero-subtitle",
    { opacity: 0, y: 12 },
    { opacity: 0.65, y: 0, duration: 0.5 },
    "-=0.2"
  );
  heroEntrance.fromTo(
    ".hero-cta",
    { opacity: 0, y: 10 },
    { opacity: 0.6, y: 0, duration: 0.45 },
    "-=0.25"
  );

  // Seed packet drifts in from slight offset
  heroEntrance.fromTo(
    ".hero-seed-packet",
    { opacity: 0, y: -20, rotation: 4 },
    { opacity: 1, y: 0, rotation: 10, duration: 0.8, ease: "power2.out" },
    0.3   // starts early, runs in parallel with text
  );

  // Sprout rises up from below
  heroEntrance.fromTo(
    ".hero-sprout",
    { opacity: 0, y: 30, scale: 0.85, transformOrigin: "bottom center" },
    { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
    0.6
  );

  // Gentle idle bob on the seed packet after entrance settles
  heroEntrance.to(
    ".hero-seed-packet",
    {
      y: -8,
      duration: 2.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    },
    "+=0.3"
  );
}

// ─── clouds ───────────────────────────────────────────────────────────────────

// slow horizontal drifting — skip if reduced-motion
if (!prefersReduced) {
  gsap.utils.toArray(".clouds img").forEach((cloud, i) => {
    gsap.to(cloud, {
      x: "+=" + (40 + i * 10),
      duration: 20 + i * 5,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
  });
}

// cloud parallax — always runs but is instant/no-op in reduced mode
gsap.utils.toArray(".clouds").forEach((cloudGroup) => {
  const clouds = cloudGroup.querySelectorAll("img");

  gsap.to(clouds, {
    y: prefersReduced ? 0 : -60,
    ease: "none",
    scrollTrigger: {
      trigger: cloudGroup.closest(".chapter"),
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// ─── ch1 — hero sequence ──────────────────────────────────────────────────────
// Two clearly tweened steps:
//   Step 1 (entrance): chapter-label fades + slides up, then heading lines
//          stagger in one by one.
//   Step 2 (readiness cue): seed-packet does a gentle idle bob so users
//          understand it's interactive.

const ch1Text  = document.querySelector("#ch1 .chapter-text");
const ch1Label = document.querySelector("#ch1 .chapter-label");
const ch1Lines = document.querySelectorAll("#ch1 .chapter-heading br, #ch1 .chapter-heading");

if (prefersReduced) {
  // Reduced-motion fallback: everything visible immediately, no motion
  gsap.set(["#ch1 .chapter-label", "#ch1 .chapter-heading", ".seed-packet"], {
    opacity: 1,
    y: 0,
    rotation: 14   // keep the designed tilt
  });
} else {
  // ── Step 1: text entrance ──────────────────────────────────────────────────
  // Wrap each line of the heading in a span so we can stagger them
  const heading = document.querySelector("#ch1 .chapter-heading");
  const rawHTML = heading.innerHTML;

  // Split on <br> to get individual lines, wrap each in a tween-able span
  const lines = rawHTML.split(/<br\s*\/?>/i);
  heading.innerHTML = lines
    .map(l => `<span class="hero-line" style="display:block;overflow:hidden;">
                 <span class="hero-line-inner" style="display:block;">${l}</span>
               </span>`)
    .join("");

  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Step 1a — label slides up and fades in
  heroTimeline.fromTo(
    "#ch1 .chapter-label",
    { opacity: 0, y: 18 },
    { opacity: 0.5, y: 0, duration: 0.55 }
  );

  // Step 1b — heading lines stagger in (each line inner slides up from its clip)
  heroTimeline.fromTo(
    "#ch1 .hero-line-inner",
    { y: "110%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.65, stagger: 0.12 },
    "-=0.2"   // overlap slightly with label finishing
  );

  // ── Step 2: seed-packet idle bob (readiness cue) ──────────────────────────
  // Starts after the text lands; a gentle up-down pulse on the packet
  heroTimeline.to(
    ".seed-packet",
    {
      y: -10,
      duration: 0.9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.3
    },
    "+=0.4"   // brief pause after text before bob starts
  );
}

// ─── ch1 — seed spill interaction ────────────────────────────────────────────
const packet = document.querySelector(".seed-packet");
const seeds  = document.querySelector(".seeds-scatter");

const seedTimeline = gsap.timeline({ paused: true });

if (prefersReduced) {
  // Reduced-motion: instant reveal of seeds, no flip
  seedTimeline
    .set(seeds, { opacity: 1, y: 80 });
} else {
  seedTimeline
    // Step 1: straighten from resting tilt
    .to(packet, {
      rotation: 0,
      duration: 0.4,
      ease: "power2.out"
    })
    // Step 2: flip upside down
    .to(packet, {
      rotation: -160,
      transformOrigin: "center center",
      duration: 0.6,
      ease: "power2.inOut"
    })
    // Seed drops out as bag passes 90 degrees
    .fromTo(
      seeds,
      { opacity: 0, y: -10, x: 0 },
      { opacity: 1, y: 80, duration: 0.7, ease: "power2.in" },
      "-=0.3"
    )
    // Seed settles with bounce
    .to(seeds, {
      y: 90,
      duration: 0.3,
      ease: "bounce.out"
    });
}

packet.addEventListener("click", () => {
  if (seedTimeline.progress() === 0 || seedTimeline.progress() === 1) {
    seedTimeline.restart();
  }
});

// ─── ch2 — raindrops ─────────────────────────────────────────────────────────
gsap.fromTo(
  "#ch2 .drops img",
  { y: prefersReduced ? 0 : -200, opacity: prefersReduced ? 1 : 0 },
  {
    y: 0,
    opacity: 1,
    stagger: prefersReduced ? 0 : 0.2,
    duration: prefersReduced ? 0 : 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#ch2",
      start: "top 70%",
      toggleActions: "play none none none"
    }
  }
);

// ─── ch3 — watering can tip ───────────────────────────────────────────────────
gsap.timeline({
  scrollTrigger: {
    trigger: "#ch3",
    start: "top 70%",
    end: "bottom center",
    scrub: prefersReduced ? false : true,
    // Reduced-motion: jump straight to tipped state on enter
    onEnter: prefersReduced
      ? () => gsap.set(".watering-can", { x: -60, rotation: -25, transformOrigin: "bottom right" })
      : undefined
  }
})
  .to(".watering-can", {
    x: -60,
    duration: 0.5,
    ease: "power1.inOut"
  })
  .to(".watering-can", {
    rotation: -25,
    transformOrigin: "bottom right",
    duration: 0.5,
    ease: "power2.inOut"
  });

// ─── ch4 — day / night toggle ─────────────────────────────────────────────────
const ch4      = document.querySelector("#ch4");
const toggleBtn = document.createElement("button");
toggleBtn.classList.add("day-night-toggle");
toggleBtn.setAttribute("aria-label", "Toggle day/night");
toggleBtn.innerHTML = `
  <svg class="icon-sun" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="7" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="20" y1="4"  x2="20" y2="9"  stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="20" y1="31" x2="20" y2="36" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="4"  y1="20" x2="9"  y2="20" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="31" y1="20" x2="36" y2="20" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="8.5"  y1="8.5"  x2="12"   y2="12"   stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="28"   y1="28"   x2="31.5"  y2="31.5" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="31.5" y1="8.5"  x2="28"   y2="12"   stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="12"   y1="28"   x2="8.5"  y2="31.5" stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
  <svg class="icon-moon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
    <path d="M13 8 C11 12, 10 16, 11 20 C12 26, 17 31, 23 31.5 C27 31.8, 30 30, 31 27
             C26 27, 21 24, 18 19 C15 14, 14 11, 13 8 Z"
      stroke="#5c4a2a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>
`;

ch4.querySelector(".chapter-visual").appendChild(toggleBtn);

let isNight = false;

const transitionDuration = prefersReduced ? 0 : 0.5;

// fromTo so .reverse() always snaps back to the explicit day colours,
// never a stale GSAP state from a previous toggle.
const dayToNight = gsap.timeline({ paused: true })
  .fromTo("#ch4 .chapter-heading",
    { color: "#3A2F2A" },
    { color: "#e8e0f0", duration: transitionDuration }
  )
  .fromTo("#ch4 .chapter-label",
    { color: "#3A2F2A" },
    { color: "#9b8ec4", duration: transitionDuration }, "<"
  )
  .fromTo(toggleBtn,
    { backgroundColor: "#f3d6d0", borderColor: "transparent" },
    { backgroundColor: "#1a1740", borderColor: "#9b8ec4", duration: transitionDuration }, "<"
  );

toggleBtn.addEventListener("click", () => {
  isNight = !isNight;
  const sun  = toggleBtn.querySelector(".icon-sun");
  const moon = toggleBtn.querySelector(".icon-moon");

  if (isNight) {
    sun.style.display  = "none";
    moon.style.display = "block";
    ch4.classList.add("chapter--dark");
    dayToNight.play();
  } else {
    sun.style.display  = "block";
    moon.style.display = "none";
    ch4.classList.remove("chapter--dark");
    dayToNight.reverse();
  }
});

// ─── ch5 — flower bloom ───────────────────────────────────────────────────────
gsap.from("#ch5 .base-flower", {
  scale:           prefersReduced ? 1 : 0,
  opacity:         prefersReduced ? 1 : 0,
  transformOrigin: "bottom center",
  duration:        prefersReduced ? 0 : 1.2,
  ease:            "back.out(1.7)",
  scrollTrigger: {
    trigger: "#ch5",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  onStart: () => gsap.set("#ch5 .base-flower", { opacity: 1 })
});

// ─── ch6 — idle sway ──────────────────────────────────────────────────────────
if (!prefersReduced) {
  gsap.to("#ch6 .base-flower", {
    rotation: 6,
    transformOrigin: "bottom center",
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    scrollTrigger: {
      trigger: "#ch6",
      start: "top 70%",
      end: "bottom bottom",
      toggleActions: "play pause resume pause"
    }
  });
}
