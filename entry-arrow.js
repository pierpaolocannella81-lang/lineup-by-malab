(() => {
  if (window.__entryArrowAlwaysVisible) return;
  window.__entryArrowAlwaysVisible = true;

  const previousPicker = selectSwapMinute;
  selectSwapMinute = function (side, outgoingIndex, incomingIndex) {
    previousPicker(side, outgoingIndex, incomingIndex);
    const modal = document.querySelector('#swapMinuteModal');
    const confirm = modal?.querySelector('.minute-confirm');
    if (!confirm || confirm.dataset.entryArrowBound) return;
    confirm.dataset.entryArrowBound = 'true';

    confirm.addEventListener('click', () => {
      const showEntryArrow = () => {
        const layer = document.querySelector('#players');
        const token = layer?.querySelector(`.token.${side}[data-index="${outgoingIndex}"]`);
        if (!layer || !token) return;
        const key = `${side}-${outgoingIndex}-${incomingIndex}`;
        layer.querySelector(`[data-entry-arrow="${key}"]`)?.remove();
        const arrow = document.createElement('span');
        arrow.className = 'field-entry-arrow';
        arrow.dataset.entryArrow = key;
        arrow.setAttribute('aria-label', 'Giocatore entrato');
        arrow.textContent = '←';
        arrow.style.left = token.style.left;
        arrow.style.top = `calc(${token.style.top} + 60px)`;
        layer.append(arrow);
      };
      setTimeout(showEntryArrow, 120);
      setTimeout(showEntryArrow, 420);
    }, true);
  };
})();
