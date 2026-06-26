const colorSwap = document.querySelector(".color-swap");
const greenDot = document.querySelector(".color-dot-green");
const redDot = document.querySelector(".color-dot-red");
const blueDot = document.querySelector(".color-dot-blue");
const colorDots = [blueDot, redDot, greenDot];
const stepOverlays = document.querySelectorAll(".step-overlay");
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

setHeaderState();
setActiveDot(redDot);
window.addEventListener("scroll", setHeaderState, { passive: true });

greenDot?.addEventListener("click", () => {
  colorSwap?.classList.add("is-green-active");
  colorSwap?.classList.remove("is-blue-active");
  setActiveDot(greenDot);
});

redDot?.addEventListener("click", () => {
  colorSwap?.classList.add("is-resetting");
  colorSwap?.classList.remove("is-green-active");
  colorSwap?.classList.remove("is-blue-active");
  setActiveDot(redDot);
  requestAnimationFrame(() => {
    colorSwap?.classList.remove("is-resetting");
  });
});

blueDot?.addEventListener("click", () => {
  colorSwap?.classList.add("is-blue-active");
  colorSwap?.classList.remove("is-green-active");
  setActiveDot(blueDot);
});

stepOverlays.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    stepOverlays.forEach((item) => item.classList.toggle("is-active", item === overlay && !overlay.classList.contains("is-active")));
  });
});

terrainTriggers.forEach((trigger) => {
  const info = terrainInfos[trigger.dataset.feature];

  trigger.addEventListener("mouseenter", () => {
    info?.classList.add("is-hovered");
  });

  trigger.addEventListener("mouseleave", () => {
    info?.classList.remove("is-hovered");
  });

  trigger.addEventListener("click", () => {
    const wasActive = info?.classList.contains("is-active");
    Object.values(terrainInfos).forEach((item) => item?.classList.remove("is-active"));
    info?.classList.toggle("is-active", !wasActive);
  });
});
