const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const terrainButtons = document.querySelectorAll("[data-target]");
const terrainItems = document.querySelectorAll(".terrain-item");

const setTerrainFeature = (feature) => {
  terrainItems.forEach((item) => {
    item.classList.toggle("is-active", item.querySelector(`[data-target="${feature}"]`) !== null);
  });

  document.querySelectorAll(".terrain-copy").forEach((copy) => {
    copy.classList.toggle("is-active", copy.id === `terrain-${feature}`);
  });
};

terrainButtons.forEach((button) => {
  button.addEventListener("pointerenter", () => setTerrainFeature(button.dataset.target));
  button.addEventListener("focus", () => setTerrainFeature(button.dataset.target));
  button.addEventListener("click", () => setTerrainFeature(button.dataset.target));
});

setTerrainFeature("manija");

const createCarousel = ({ slidesSelector, dotsContainerSelector, previousSelector, nextSelector }) => {
  const slides = Array.from(document.querySelectorAll(slidesSelector));
  const dotsContainer = document.querySelector(dotsContainerSelector);
  const previous = document.querySelector(previousSelector);
  const next = document.querySelector(nextSelector);

  if (!slides.length || !dotsContainer) return;

  let activeIndex = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a la diapositiva ${index + 1}`);
    dot.addEventListener("click", () => setSlide(index));
    dotsContainer.append(dot);
    return dot;
  });

  const setSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  previous?.addEventListener("click", () => setSlide(activeIndex - 1));
  next?.addEventListener("click", () => setSlide(activeIndex + 1));

  setSlide(0);
};

createCarousel({
  slidesSelector: ".action-slide",
  dotsContainerSelector: ".action-dots",
  previousSelector: ".carousel-prev",
  nextSelector: ".carousel-next",
});

createCarousel({
  slidesSelector: ".review-slide",
  dotsContainerSelector: ".review-dots",
  previousSelector: ".review-prev",
  nextSelector: ".review-next",
});

const colorPicker = document.querySelector(".color-picker");
const colorDots = Array.from(document.querySelectorAll(".color-dot"));
const colorArrows = Array.from(document.querySelectorAll(".color-arrow"));
const colorLabel = document.querySelector(".color-label");
const colors = ["blue", "red", "green"];
const labels = {
  blue: "Celeste cielo",
  red: "Rojo óxido",
  green: "Verde oscuro",
};
let activeColor = "red";

const setColor = (color) => {
  activeColor = color;
  colorPicker?.setAttribute("data-active", color);
  colorDots.forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.color === color);
  });
  if (colorLabel) {
    colorLabel.textContent = labels[color];
  }
};

const moveColor = (direction) => {
  const currentIndex = colors.indexOf(activeColor);
  const nextIndex = (currentIndex + direction + colors.length) % colors.length;
  setColor(colors[nextIndex]);
};

colorDots.forEach((dot) => {
  dot.addEventListener("click", () => setColor(dot.dataset.color));
});

colorArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => moveColor(Number(arrow.dataset.direction)));
});

setColor(activeColor);
