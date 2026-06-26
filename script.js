const colorSwap = document.querySelector(".color-swap");
const greenDot = document.querySelector(".color-dot-green");
const redDot = document.querySelector(".color-dot-red");
const blueDot = document.querySelector(".color-dot-blue");
const colorDots = [blueDot, redDot, greenDot];
const stepOverlays = document.querySelectorAll(".step-overlay");

const setActiveDot = (dot) => {
  colorDots.forEach((item) => item?.classList.toggle("is-active", item === dot));
};

setActiveDot(redDot);

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
