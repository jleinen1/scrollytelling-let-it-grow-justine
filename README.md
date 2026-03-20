# Let It Grow: A Garden Themed Journey Through Javascript
#### Video Demo:  https://jleinen1.github.io/scrollytelling-let-it-grow-justine/
#### Description:
Seeds & Systems
A garden-themed, narrative journey that teaches core JavaScript concepts through visual storytelling. Each chapter pairs a JavaScript concept: variables, conditionals, localStorage, design systems with an illustration that reacts as you read and scroll. The metaphor is intentional: code, like a garden, is something you tend over time.
Built with plain HTML, CSS, and JavaScript. GSAP handles all motion. 

File Overview
index.html: A hero section followed by six chapter sections, each using a two-column grid: text left, illustration right. An inline <script> in the <head> reads localStorage and sets data-theme on <html> before first paint to prevent theme flash. The full body is wrapped in #smooth-wrapper / #smooth-content for ScrollSmoother.
variables.css: Single source of truth for all colours, fonts, and spacing. Defines light mode on :root, dark mode on [data-theme="dark"], and a prefers-color-scheme media query for users who haven't made an explicit choice.
styles.css: Layoutsand visual styles. The sky-to-soil gradient on each chapter uses token values so it shifts correctly in dark mode. Contains the ScrollSmoother wrapper rules and a thorough prefers-reduced-motion block that sets every animated element to its final visible state without any motion.
animations.js: Structured top-to-bottom: plugin registration, scroll restoration, reduced-motion detection, ScrollSmoother init, theme system, then chapter animations in order. ScrollSmoother runs at smooth: 1.4 with the hero visual at 0.6× scroll speed and the ch5 flower on a 0.3s lag. The theme system stores the user's intent ("light", "dark", or "system") in localStorage and wires into the ch4 day/night toggle. Nine ScrollTrigger instances total.

Design Choices
Typography pairs DM Serif Display with IBM Plex Sans, the serif carries the poetic tone of the writing, the sans-serif grounds it in the technical subject. The light mode palette is warm and earthy (linen, dusty sky, deep brown); dark mode shifts to dark greens without feeling cold, keeping the garden metaphor intact at night. Accessibility runs throughout: reduced-motion fallbacks in both CSS and JS, ScrollSmoother bypassed for reduced-motion users, and descriptive alt attributes on every image.

#### Links
- Live site: https://jleinen1.github.io/scrollytelling-let-it-grow-justine/
- Repo: https://github.com/jleinen1/scrollytelling-let-it-grow-justine

#### Tech stack
HTML, CSS, JavaScript, GSAP, ScrollTrigger, ScrollSmoother

#### Reflection
- **Metaphor summary: My metaphor is a garden and how I struggled throughout this quarter but was eventually able to create a  functional scrollytelling site.**
- **One section I'm most proud of: The section I am the most proud of is the hero and the seed packet that does the little spin at the begginging because I think it's cute and looks clean.**
- **One technical bug I solved: The day/night toggle was leaving the chapter heading text in a light, pastel color even after switching back to day mode. The issue was that the GSAP timeline used .to() to animate to the night colours, so when reversed it tried to animate back to whatever state GSAP had recorded on first run. I fixed it by switching to .fromTo(), so reversing always snaps back to the correct dark brown regardless of it's prior state.**
- **One accessibility decision: Pretty much all the animations have a prefers reduced motion alternative. I mostly just chose to skip animations and let the user see finished composition of the frame/slide.**
- **What I'd improve with more time: Timing and responsiveness, specifically the mobile version**
  
## How To Use Issues

1. Create `Project 2 Master Checklist` issue first.
2. Create all required sub-issues from templates.
3. Link sub-issues back into the master issue.
4. Use `Blocker Report` if stuck for more than 20 minutes.
