const colorSwap = document.querySelector(".color-swap");
const greenDot = document.querySelector(".color-dot-green");
const redDot = document.querySelector(".color-dot-red");
const blueDot = document.querySelector(".color-dot-blue");
const leftArrow = document.querySelector(".color-arrow-left");
const rightArrow = document.querySelector(".color-arrow-right");
const colorName = document.querySelector(".color-name");
const colorDots = [blueDot, redDot, greenDot];
const colorOrder = ["blue", "red", "green"];
const colorLabels = {
  blue: "Celeste cielo",
  red: "Rojo óxido",
  green: "Verde oscuro",
};
let activeColor = "red";
const stepOverlays = document.querySelectorAll(".step-overlay");
const carouselImages = document.querySelectorAll(".action-carousel-image");
const carouselPrev = document.querySelector(".action-carousel-prev");
const carouselNext = document.querySelector(".action-carousel-next");
let activeCarouselImage = 0;
const terrainTriggers = document.querySelectorAll(".terrain-trigger");
const terrainInfos = {
  battery: document.querySelector(".battery-hover"),
  deposit: document.querySelector(".deposit-hover"),
  steel: document.querySelector(".steel-hover"),
  transport: document.querySelector(".transport-hover"),
};

const setHeaderState = () => {
  document.body.classList.toggle("is-scrolled", window.scrollY > 12);
};

const setActiveDot = (dot) => {
  colorDots.forEach((item) => item?.classList.toggle("is-active", item === dot));
};

const selectColor = (color) => {
  if (!colorSwap) return;

  activeColor = color;
  colorSwap.classList.toggle("is-blue-active", color === "blue");
  colorSwap.classList.toggle("is-red-active", color === "red");
  colorSwap.classList.toggle("is-green-active", color === "green");

  const activeDot = {
    blue: blueDot,
    red: redDot,
    green: greenDot,
  }[color];
  setActiveDot(activeDot);
  if (colorName) {
    colorName.textContent = colorLabels[color];
  }
};

const moveColor = (direction) => {
  const currentIndex = colorOrder.indexOf(activeColor);
  const nextIndex = (currentIndex + direction + colorOrder.length) % colorOrder.length;
  selectColor(colorOrder[nextIndex]);
};

const setCarouselImage = (index) => {
  if (!carouselImages.length) return;

  activeCarouselImage = (index + carouselImages.length) % carouselImages.length;
  carouselImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === activeCarouselImage);
  });
};

setHeaderState();
selectColor("red");
window.addEventListener("scroll", setHeaderState, { passive: true });

greenDot?.addEventListener("click", () => {
  selectColor("green");
});

redDot?.addEventListener("click", () => {
  selectColor("red");
});

blueDot?.addEventListener("click", () => {
  selectColor("blue");
});

leftArrow?.addEventListener("click", () => moveColor(-1));
rightArrow?.addEventListener("click", () => moveColor(1));

carouselPrev?.addEventListener("click", () => {
  setCarouselImage(activeCarouselImage - 1);
});

carouselNext?.addEventListener("click", () => {
  setCarouselImage(activeCarouselImage + 1);
});

stepOverlays.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    stepOverlays.forEach((item) => item.classList.toggle("is-active", item === overlay && !overlay.classList.contains("is-active")));
  });
});

terrainTriggers.forEach((trigger) => {
  const info = terrainInfos[trigger.dataset.feature];

  const showInfo = () => {
    info?.classList.add("is-hovered");
  };

  trigger.addEventListener("pointerenter", showInfo);
  trigger.addEventListener("pointerdown", showInfo);

  trigger.addEventListener("pointerleave", () => {
    info?.classList.remove("is-hovered");
  });

  trigger.addEventListener("click", () => {
    const wasActive = info?.classList.contains("is-active");
    Object.values(terrainInfos).forEach((item) => item?.classList.remove("is-active"));
    info?.classList.toggle("is-active", !wasActive);
  });
});
