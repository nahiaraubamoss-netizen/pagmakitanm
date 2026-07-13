const DESKTOP_WIDTH = 1920;
const DESIGN_HEIGHT = 10398;
const root = document.documentElement;

const sizeArtboard = () => {
  const scale = window.innerWidth / DESKTOP_WIDTH;
  root.style.setProperty("--scale", String(scale));
};

sizeArtboard();
window.addEventListener("resize", sizeArtboard, { passive: true });

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
document.querySelectorAll(".pin").forEach((pin) => {
  ["mouseenter", "focus", "click"].forEach((eventName) => pin.addEventListener(eventName, () => setFeature(pin.dataset.feature)));
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
let colorIndex = 1;
const showColor = (next) => {
  colorIndex = (next + colors.length) % colors.length;
  const color = colors[colorIndex];
  document.querySelectorAll(".product").forEach((product) => product.classList.toggle("is-center", product.classList.contains(`product-${color}`)));
  document.querySelectorAll(".product-dots button").forEach((dot) => dot.classList.toggle("is-active", dot.dataset.color === color));
};
document.querySelectorAll(".product-arrow").forEach((arrow) => arrow.addEventListener("click", () => showColor(colorIndex + Number(arrow.dataset.dir))));
document.querySelectorAll(".product-dots button").forEach((dot, i) => dot.addEventListener("click", () => showColor(i)));
showColor(colorIndex);
