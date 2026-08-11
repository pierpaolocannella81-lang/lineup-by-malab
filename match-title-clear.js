(() => {
  const title = document.querySelector('.match-title[contenteditable="true"]');
  if (!title) return;
  let previousTitle = '';
  const clearTitle = () => {
    if (document.activeElement !== title) return;
    if (!previousTitle) previousTitle = title.textContent.trim() || 'Nuova partita';
    if (title.textContent.trim()) title.textContent = '';
  };
  title.addEventListener('focus', clearTitle);
  title.addEventListener('click', clearTitle);
  title.addEventListener('blur', () => {
    if (!title.textContent.trim()) title.textContent = previousTitle || 'Nuova partita';
    previousTitle = '';
    title.dispatchEvent(new Event('input', { bubbles: true }));
  });
})();
