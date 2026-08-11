(() => {
  const selector = document.querySelector('#lineupSelector');
  if (!selector) return;
  const markFieldNames = () => {
    const names = [...document.querySelectorAll('#players .field-surname')];
    const homeCount = teams.home.players.length;
    names.forEach((name, index) => { name.dataset.side = index < homeCount ? 'home' : 'away'; });
  };
  const apply = mode => {
    document.body.dataset.lineup = mode;
       selector.querySelector('summary').textContent = 'SEL. LINEUP';
       selector.open = false;
       markFieldNames();
       if (typeof buildTokens === 'function') buildTokens();
       window.dispatchEvent(new CustomEvent('lineup-change', { detail: { mode } }));
  };
  selector.querySelectorAll('[data-lineup-choice]').forEach(button => button.addEventListener('click', () => apply(button.dataset.lineupChoice)));
  new MutationObserver(markFieldNames).observe(document.querySelector('#players'), { childList: true });
  apply('both');
})();
