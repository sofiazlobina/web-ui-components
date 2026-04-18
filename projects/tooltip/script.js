let activeTooltip = null;
let activeElement = null;


  document.addEventListener("click", function (event) {
    const target = event.target.closest(".has-tooltip");

    // Закрытие всплывающей подсказки через клик по любой области экрана
    if (!target) {
        if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
        activeElement = null;
        }
        return;
    }

  event.preventDefault();

  // Закрытие повторным кликом на исходном тексту
  if (activeElement === target) {
    activeTooltip.remove();
    activeTooltip = null;
    activeElement = null;
    return;
  }

  // Удаляем старый tooltip
  if (activeTooltip) {
    activeTooltip.remove();
  }

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip tooltip_active";
  tooltip.textContent = target.getAttribute("title");

  document.body.appendChild(tooltip);

  const coords = target.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  const position = target.dataset.position || "top";

  let left, top;

  switch (position) {
    case "left":
      left = coords.left + scrollX - tooltip.offsetWidth - 5;
      top = coords.top + scrollY + (target.offsetHeight - tooltip.offsetHeight) / 2;
      break;

    case "right":
      left = coords.right + scrollX + 5;
      top = coords.top + scrollY + (target.offsetHeight - tooltip.offsetHeight) / 2;
      break;

    case "bottom":
      left = coords.left + scrollX + (target.offsetWidth - tooltip.offsetWidth) / 2;
      top = coords.bottom + scrollY + 5;
      break;

    default: // top
      left = coords.left + scrollX + (target.offsetWidth - tooltip.offsetWidth) / 2;
      top = coords.top + scrollY - tooltip.offsetHeight - 5;
  }

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";

  activeTooltip = tooltip;
  activeElement = target;
});