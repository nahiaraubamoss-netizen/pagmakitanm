const DESKTOP_WIDTH = 1920;
const DESIGN_HEIGHT = 10459;
const root = document.documentElement;
const header = document.querySelector(".site-header");
let currentScale = 1;

const sizeArtboard = () => {
  currentScale = window.innerWidth / DESKTOP_WIDTH;
  root.style.setProperty("--scale", String(currentScale));
  pinHeader();
};

const pinHeader = () => {
  if (!header) return;
  const artboardY = window.scrollY / currentScale;
  header.style.transform = `translateY(${artboardY}px)`;
  header.classList.toggle("is-scrolled", artboardY > 80);
};

sizeArtboard();
window.addEventListener("resize", sizeArtboard, { passive: true });
window.addEventListener("scroll", pinHeader, { passive: true });

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton?.addEventListener("click", () => {
  const open = navigation?.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(Boolean(open)));
});

document.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", () => {
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const setFeature = (name) => {
  document.querySelectorAll("[data-feature]").forEach((element) => element.classList.toggle("is-active", element.dataset.feature === name));
};
const clearFeature = () => {
  document.querySelectorAll("[data-feature]").forEach((element) => element.classList.remove("is-active"));
};
document.querySelectorAll(".pin").forEach((pin) => {
  ["mouseenter", "focus", "click"].forEach((eventName) => pin.addEventListener(eventName, () => setFeature(pin.dataset.feature)));
  ["mouseleave", "blur"].forEach((eventName) => pin.addEventListener(eventName, clearFeature));
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
    dot.addEventListener("click", () => show(i));
    dotsBox.append(dot);
  });
  slider.querySelectorAll(".arrow").forEach((arrow) => arrow.addEventListener("click", () => show(index + Number(arrow.dataset.dir))));
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
document.querySelectorAll(".product-arrow").forEach((arrow) => arrow.addEventListener("click", () => showColor(colorIndex + Number(arrow.dataset.dir))));
document.querySelectorAll(".product-dots button").forEach((dot, i) => dot.addEventListener("click", () => showColor(i)));
showColor(colorIndex);
