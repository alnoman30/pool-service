// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pixxen  tree js start
// ============================================
// NAVBAR SCROLL BACKGROUND EFFECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("pool-main-nav");

  // Function to update navbar background based on scroll position
  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-[#73E2DF]");
    } else {
      navbar.classList.remove("bg-[#73E2DF]");
      navbar.classList.add("bg-transparent");
    }
  }

  // Run immediately on page load to catch reloads further down the page
  updateNavbar();

  // Run on scroll
  window.addEventListener("scroll", updateNavbar);
});


// Pool timeline card
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray(".pool-timeline-card-wrap");

  sections.forEach((section) => {
    const cards = section.querySelectorAll(".pool-timeline-card");

    gsap.fromTo(
      cards,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });
});

// 
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#pool-banner-section");
  if (!section) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(section.querySelectorAll("*"), { clearProps: "all" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const q = gsap.utils.selector(section);

    const title = q(".pool-banner-title");
    const desc = q(".pool-banner-desc");
    const cta = q(".pool-banner-cta");
    const priceHead = q(".pool-banner-pricebox > div:nth-child(1)");
    const price = q(".pool-banner-pricebox > div:nth-child(2)");
    const divider = q(".pool-banner-pricebox > div:nth-child(3)");
    const checkItems = q(".pool-banner-checklist li");
    const checkIcons = q(".pool-banner-checklist li img");
    const mockup = q(".pool-hero-mockup");

    // Initial states
    gsap.set(title, { autoAlpha: 0, x: -120, filter: "blur(3px)" });
    gsap.set([desc, cta], { autoAlpha: 0, y: 30 });
    gsap.set([priceHead, price], { autoAlpha: 0, y: 20 });
    gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(checkItems, { autoAlpha: 0, x: -24 });
    gsap.set(checkIcons, { scale: 0, rotate: -45 });
    gsap.set(mockup, {
      autoAlpha: 0, x: 140, y: 80,
      transformOrigin: "bottom right",
    });

    let wave;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true,
      },
    });

    // Title: slides in from the left, fades in, blur clears
    tl.to(title, {
      autoAlpha: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "expo.out",
      onComplete: () => gsap.set(title, { clearProps: "filter,transform" }),
    }, 0.1);

    // Description + CTA
    tl.to(desc, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power2.out" }, "-=1.1")
      .to(cta, { autoAlpha: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.7");

    // Price box
    tl.to(priceHead, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.6")
      .to(price, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.65")
      .to(divider, { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.6");

    // Checklist
    tl.to(checkItems, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.15 }, "-=0.5")
      .to(checkIcons, {
        scale: 1, rotate: 0, duration: 0.8,
        ease: "back.out(1.7)", stagger: 0.15,
      }, "<0.1");

    // Mockup entrance: lands slightly past the edges so no gap shows
    tl.to(mockup, {
      autoAlpha: 1, x: 8, y: 12,
      duration: 2, ease: "power3.out",
    }, 0.3);

    // Continuous slow wave
    tl.add(() => {
      wave = gsap.to(mockup, {
        rotation: 3,      // tilt amount (was 1)
        y: 40,            // vertical sway (was 18)
        x: 16,            // optional side drift (was 8)
        duration: 4,      // seconds per swing (was 5)
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    tl.add(() => gsap.set(cta, { clearProps: "transform,opacity,visibility" }));

    return () => {
      tl.kill();
      if (wave) wave.kill();
    };
  });
});

// 
(function () {
  "use strict";

  // Bail out if GSAP isn't loaded, or if this script already ran on the page
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.__poolHeadingRevealInit) return;
  window.__poolHeadingRevealInit = true;

  const SELECTOR = ".pool-heading-reveal";
  const PREFIX = "phr"; // namespace for generated classes
  const BLUR = 4;       // px, set to 3 to match the hero title

  gsap.registerPlugin(ScrollTrigger); // safe to call more than once

  function init() {
    const mm = gsap.matchMedia(); // own instance, doesn't touch other matchMedia code

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(SELECTOR, { clearProps: "all" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let instances = [];
      let cancelled = false;
      let resizeTimer;
      let lastW = window.innerWidth;

      const onResize = () => {
        if (window.innerWidth === lastW) return; // ignore mobile address-bar resizes
        lastW = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          instances.forEach((i) => i.rebuild());
        }, 250);
      };

      // Line breaks depend on the font, so wait until fonts are loaded
      document.fonts.ready.then(() => {
        if (cancelled) return;
        instances = gsap.utils.toArray(SELECTOR).map(createReveal);
        window.addEventListener("resize", onResize);
      });

      // matchMedia cleanup (runs if the media query stops matching)
      return () => {
        cancelled = true;
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        instances.forEach((i) => i.kill());
        instances = [];
      };
    });
  }

  function createReveal(el) {
    const originalHTML = el.innerHTML;
    const label = el.textContent.trim().replace(/\s+/g, " ");
    let tween = null;
    let trigger = null;
    let played = false;

    function split() {
      // 1) wrap every word to measure which line it sits on
      el.innerHTML = label
        .split(" ")
        .map((w) => `<span class="${PREFIX}-w" style="display:inline-block">${w}</span>`)
        .join(" ");

      const words = [...el.querySelectorAll(`.${PREFIX}-w`)];
      const lines = [];
      let lastTop = null;
      words.forEach((w) => {
        const top = w.offsetTop;
        if (top !== lastTop) {
          lines.push([]);
          lastTop = top;
        }
        lines[lines.length - 1].push(w.textContent);
      });

      // 2) each line = fixed mask (overflow hidden) + inner span that moves
      el.innerHTML = lines
        .map(
          (l) =>
            `<span class="${PREFIX}-mask" style="display:block;overflow:hidden;padding-bottom:.14em;margin-bottom:-.14em">` +
            `<span class="${PREFIX}-inner" style="display:block;will-change:transform">${l.join(" ")}</span>` +
            `</span>`
        )
        .join("");

      el.setAttribute("aria-label", label);
      return [...el.querySelectorAll(`.${PREFIX}-inner`)];
    }

    function clearAnimation() {
      if (tween) tween.kill();
      if (trigger) trigger.kill();
      tween = trigger = null;
    }

    function build() {
      const inners = split();

      if (played) return; // already revealed: keep the new line layout visible

      gsap.set(inners, {
        yPercent: 110,
        rotate: 4,
        filter: `blur(${BLUR}px)`,
        transformOrigin: "left top",
      });

      tween = gsap.to(inners, {
        yPercent: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        paused: true,
        onComplete: () => {
          played = true;
          gsap.set(inners, { clearProps: "filter" }); // keep text crisp afterwards
        },
      });

      trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => tween && tween.play(),
      });
    }

    function rebuild() {
      clearAnimation();
      el.innerHTML = originalHTML;
      build();
    }

    function kill() {
      clearAnimation();
      el.innerHTML = originalHTML;
      el.removeAttribute("aria-label");
    }

    build();
    return { rebuild, kill };
  }

  // Run now if the DOM is already ready, otherwise wait for it
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();