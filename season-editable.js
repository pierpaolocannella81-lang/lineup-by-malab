(() => {
  const replaceSeasonMenu = () => {
    const menu = document.querySelector('.season-menu');
    if (!menu || menu.tagName !== 'DETAILS') return;
    const season = document.createElement('span');
    season.className = 'season-menu';
    season.contentEditable = 'true';
    season.spellcheck = false;
    season.title = 'Clicca per modificare la stagione sportiva';
    season.textContent = menu.querySelector('summary')?.textContent.trim() || '2026/2027';
    menu.replaceWith(season);
  };
  setTimeout(replaceSeasonMenu, 80);
})();
