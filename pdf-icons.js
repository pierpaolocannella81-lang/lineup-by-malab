(() => {
  const acrobatIcon = `<svg viewBox="0 0 32 32" role="img" aria-label="PDF"><rect x="1" y="1" width="30" height="30" rx="5" fill="#e5232b"/><path d="M16 6c-2.1 4.4-3.2 8-4.9 11.2-2.2.6-4.1 1.5-5.1 2.8-.7.9-.3 1.8.8 1.8 1.6 0 3.8-1.9 5.8-5.1 2.4-.5 5.1-.5 7.4.1 1.7 2.4 3.3 3.5 4.6 3.5 1.2 0 1.7-.9 1-1.7-.8-1-2.3-1.9-4.2-2.6-1.6-2.6-3.1-5.6-4.1-9.9-.3-1.3-1.1-1.3-1.3-.1Zm.2 3.4c.6 2.1 1.3 3.9 2.2 5.6-1.6-.2-3.3-.2-4.8 0 1-1.9 1.8-3.8 2.6-5.6Z" fill="#fff"/></svg>`;
  ['#pdfBtn', '#simplePdfBtn'].forEach(selector => {
    const icon = document.querySelector(`${selector} .save-project-icon`);
    if (!icon) return;
    icon.classList.add('acrobat-icon');
    icon.innerHTML = acrobatIcon;
  });
})();
