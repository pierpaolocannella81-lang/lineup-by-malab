(() => {
  const repository = 'pierpaolocannella81-lang/lineup-by-malab';
  const currentVersion = '1.0.3';
  const button = document.querySelector('#checkUpdatesBtn');
  if (!button) return;

  const compareVersions = (first, second) => {
    const one = String(first).replace(/^v/i, '').split('.').map(Number);
    const two = String(second).replace(/^v/i, '').split('.').map(Number);
    for (let index = 0; index < Math.max(one.length, two.length); index += 1) {
      const difference = (one[index] || 0) - (two[index] || 0);
      if (difference) return difference;
    }
    return 0;
  };

  const showMessage = (title, message, downloadUrl = '') => {
    document.querySelector('#updateModal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'updateModal';
    modal.className = 'update-modal';
    modal.innerHTML = `<div class="update-card"><h2>${title}</h2><p>${message}</p><div class="update-actions">${downloadUrl ? '<button type="button" class="update-download">Scarica e installa</button>' : ''}<button type="button" class="update-close">Chiudi</button></div></div>`;
    document.body.append(modal);
    modal.querySelector('.update-close').onclick = () => modal.remove();
    modal.querySelector('.update-download')?.addEventListener('click', () => {
      window.open(downloadUrl, '_blank', 'noopener');
      modal.remove();
    });
  };

  button.addEventListener('click', async () => {
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Controllo…';
    try {
      const response = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
      if (response.status === 404) {
        showMessage('Aggiornamenti non disponibili', 'Pubblica prima una release su GitHub con il file Setup dell’app.');
        return;
      }
      if (!response.ok) throw new Error('release non disponibile');
      const release = await response.json();
      const latestVersion = String(release.tag_name || release.name || '').replace(/^v/i, '');
      if (!latestVersion || compareVersions(latestVersion, currentVersion) <= 0) {
        showMessage('App aggiornata', `Stai già usando la versione più recente (${currentVersion}).`);
        return;
      }
      const installer = (release.assets || []).find(asset => /setup.*\.exe$/i.test(asset.name || ''))
        || (release.assets || []).find(asset => /\.exe$/i.test(asset.name || ''));
      const downloadUrl = installer?.browser_download_url || release.html_url;
      showMessage('Aggiornamento disponibile', `È disponibile LineUp by MALab ${latestVersion}. Premi “Scarica e installa”, poi apri il file scaricato per completare l’aggiornamento.`, downloadUrl);
    } catch {
      showMessage('Impossibile verificare', 'Controlla la connessione Internet e riprova tra poco.');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();
