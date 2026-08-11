(() => {
  const actions = document.querySelector('.top-actions');
  if (!actions || document.querySelector('#clearProjectBtn')) return;

  const button = document.createElement('button');
  button.id = 'clearProjectBtn';
  button.type = 'button';
  button.className = 'top-button clear-project-button';
  button.innerHTML = 'Ripulisci<span class="clear-project-icon" aria-hidden="true"><svg viewBox="0 0 32 24"><path d="M5 11a10 10 0 0 1 17-5"/><path d="M21 3h4v5"/><path d="M27 13a10 10 0 0 1-17 5"/><path d="M11 21H7v-5"/></svg></span>';
  actions.insertBefore(button, actions.querySelector('#saveProjectBtn') || actions.firstChild);

  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!window.confirm('Vuoi ripulire la partita? Verranno eliminati squadre, giocatori, eventi, risultati e statistiche non salvati.')) return;
    try {
      // Le competizioni create restano disponibili: vengono cancellati solo
      // i dati della partita corrente.
      localStorage.removeItem('lavagnaCalcioAuto');
      localStorage.removeItem('lavagnaCalcioTeamNames');
      sessionStorage.removeItem('lavagnaCalcioAuto');
      delete window.__downloadedProjectState;
    } catch {}
    window.location.replace(`${window.location.pathname}${window.location.search}`);
  }, true);
})();
