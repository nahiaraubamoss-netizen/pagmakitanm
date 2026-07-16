const DESKTOP_WIDTH = 1920;
const MOBILE_WIDTH = 414;
const root = document.documentElement;
const header = document.querySelector(".site-header");
let currentScale = 1;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
if (window.location.hash) {
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}
window.scrollTo(0, 0);

const sizeArtboard = () => {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const designWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
  currentScale = isMobile ? window.innerWidth / designWidth : Math.min(window.innerWidth / designWidth, 1);
  root.style.setProperty("--scale", String(currentScale));
  pinHeader();
};

const pinHeader = () => {
  if (!header) return;
  const artboardY = window.scrollY / currentScale;
  header.style.transform = `translateY(${artboardY}px)`;
  header.style.opacity = "1";
  header.style.visibility = "visible";
  header.classList.toggle("is-scrolled", artboardY > 80);
};

const keepHeaderPinned = () => {
  let frames = 0;
  const tick = () => {
    pinHeader();
    frames += 1;
    if (frames < 90) requestAnimationFrame(tick);
  };
  tick();
};

sizeArtboard();
window.addEventListener("resize", sizeArtboard, { passive: true });
window.addEventListener("scroll", pinHeader, { passive: true });
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  pinHeader();
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, {
  rootMargin: "0px 0px -18% 0px",
  threshold: 0.08,
});
revealElements.forEach((element) => revealObserver.observe(element));

const stepCards = document.querySelectorAll(".step-grid article");
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, {
  rootMargin: "0px 0px -28% 0px",
  threshold: 0.35,
});
stepCards.forEach((card) => stepObserver.observe(card));

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton?.addEventListener("click", () => {
  const open = navigation?.classList.toggle("is-open");
  menuButton.classList.toggle("is-open", Boolean(open));
  menuButton.setAttribute("aria-expanded", String(Boolean(open)));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
  const targetId = link.getAttribute("href");
  if (targetId && targetId.length > 1) {
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      window.scrollTo({
        top: target.offsetTop * currentScale,
        behavior: "smooth",
      });
      history.replaceState(null, "", targetId);
      keepHeaderPinned();
    }
  }
  navigation?.classList.remove("is-open");
  menuButton?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  keepHeaderPinned();
}));

const setFeature = (name) => {
  document.querySelectorAll("[data-feature]").forEach((element) => element.classList.toggle("is-active", element.dataset.feature === name));
};
const clearFeature = () => {
  document.querySelectorAll("[data-feature]").forEach((element) => element.classList.remove("is-active"));
};
const isMobileView = () => window.matchMedia("(max-width: 600px)").matches;
document.querySelectorAll(".pin").forEach((pin) => {
  ["mouseenter", "focus", "click"].forEach((eventName) => pin.addEventListener(eventName, () => setFeature(pin.dataset.feature)));
  ["mouseleave", "blur"].forEach((eventName) => pin.addEventListener(eventName, () => {
    if (!isMobileView()) clearFeature();
  }));
});
document.querySelectorAll(".part").forEach((part) => {
  part.addEventListener("click", () => setFeature(part.dataset.feature));
});

const setupSlider = (slider) => {
  const slides = [...slider.querySelectorAll(".slide")];
  const dotsBox = slider.querySelector(".dots");
  let index = 0;
  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    [...dotsBox.children].forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
    dot.addEventListener("click", () => {
      show(i);
      keepHeaderPinned();
    });
    dotsBox.append(dot);
  });
  slider.querySelectorAll(".arrow").forEach((arrow) => arrow.addEventListener("click", () => {
    show(index + Number(arrow.dataset.dir));
    keepHeaderPinned();
  }));
  if (slider.classList.contains("action-slider")) {
    const viewport = slider.querySelector(".viewport");
    let startX = 0;
    let dragging = false;
    viewport?.addEventListener("pointerdown", (event) => {
      if (!isMobileView()) return;
      dragging = true;
      startX = event.clientX;
      viewport.setPointerCapture?.(event.pointerId);
    });
    viewport?.addEventListener("pointerup", (event) => {
      if (!dragging) return;
      dragging = false;
      const movement = event.clientX - startX;
      if (Math.abs(movement) > 45) show(index + (movement < 0 ? 1 : -1));
    });
    viewport?.addEventListener("pointercancel", () => {
      dragging = false;
    });
  }
  show(0);
};
document.querySelectorAll(".slider").forEach(setupSlider);

const colors = ["blue", "red", "green"];
const colorNames = {
  blue: "Celeste cielo",
  red: "Rojo óxido",
  green: "Verde oscuro",
};
let colorIndex = 1;
const showColor = (next) => {
  colorIndex = (next + colors.length) % colors.length;
  const centerColor = colors[colorIndex];
  const leftColor = colors[(colorIndex - 1 + colors.length) % colors.length];
  const rightColor = colors[(colorIndex + 1) % colors.length];
  document.querySelectorAll(".product").forEach((product) => {
    product.classList.remove("is-left", "is-center", "is-right");
    if (product.classList.contains(`product-${leftColor}`)) product.classList.add("is-left");
    if (product.classList.contains(`product-${centerColor}`)) product.classList.add("is-center");
    if (product.classList.contains(`product-${rightColor}`)) product.classList.add("is-right");
  });
  document.querySelectorAll(".product-dots button").forEach((dot) => dot.classList.toggle("is-active", dot.dataset.color === centerColor));
  const colorName = document.querySelector(".product-color-name");
  if (colorName) colorName.textContent = colorNames[centerColor];
};
document.querySelectorAll(".product-arrow").forEach((arrow) => arrow.addEventListener("click", () => {
  showColor(colorIndex + Number(arrow.dataset.dir));
  keepHeaderPinned();
}));
document.querySelectorAll(".product-dots button").forEach((dot, i) => dot.addEventListener("click", () => {
  showColor(i);
  keepHeaderPinned();
}));
showColor(colorIndex);
