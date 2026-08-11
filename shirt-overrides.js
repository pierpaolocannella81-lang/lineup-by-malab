(() => {
  const updateColorControls = (root, style) => {
    if (!root) return;
    root.querySelectorAll('[data-player-color="three"],[data-keeper-color="three"]').forEach(input => {
      const label = input.closest('label');
      if (label) label.style.display = style === 'solid' ? 'none' : '';
    });
    root.querySelectorAll('[data-player-color="two"],[data-keeper-color="two"]').forEach(input => {
      const label = input.closest('label');
      if (label) label.style.display = '';
    });
  };
  const previousBuildTokens = buildTokens;
  buildTokens = function () {
    previousBuildTokens();
    for (const side of ['home', 'away']) {
      document.querySelectorAll(`.token.${side}`).forEach(token => {
        const player = teams[side].players[token.dataset.index];
        const keeper = player?.[2] === 'POR';
        const prefix = keeper ? 'keeper' : 'player';
        if (!player || teams[side][`${prefix}Image`] || (teams[side][`${prefix}ShirtStyle`] || 'solid') !== 'solid') return;
        const color = teams[side][`${prefix}Color1`] || (keeper ? '#f5d20a' : teams[side].kit);
        token.style.setProperty('background', color, 'important');
        token.style.setProperty('background-image', 'none', 'important');
        token.style.setProperty('background-color', color, 'important');
      });
    }
  };
  document.addEventListener('click', event => {
    const preview = event.target.closest('.kit-preview');
    if (preview) updateColorControls(preview.closest('.keeper-shirt-style'), preview.dataset.style);
    const opener = event.target.closest('.open-keeper-styles');
    if (opener) setTimeout(() => {
      const root = opener.closest('.keeper-shirt-style');
      updateColorControls(root, root?.querySelector('.kit-preview.selected')?.dataset.style || 'solid');
    }, 0);
  });
  buildTokens();
})();
