(() => {
  const cleanName = value => String(value || 'nuova-partita')
    .trim().replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, '-').slice(0, 70) || 'nuova-partita';
  const text = selector => document.querySelector(selector)?.textContent?.trim() || '';

  const projectData = () => ({
    app: 'Lavagna Calcio',
    version: 1,
    savedAt: new Date().toISOString(),
    teams,
    positions,
    seconds: typeof seconds === 'number' ? seconds : 0,
    period: document.querySelector('#period')?.value || '',
    selectedTableEvents: window.selectedTableEvents || { home: [], away: [] },
    tableSwapEvents: window.tableSwapEvents || { home: [], away: [] },
    fields: {
      title: text('.match-title'),
      homeName: document.querySelector('#homeName')?.value || '',
      awayName: document.querySelector('#awayName')?.value || '',
      homeScore: text('#homeScore'),
      awayScore: text('#awayScore'),
      giornata: text('.match-day'),
      data: text('.match-date'),
      campo: text('.venue-value-fixed'),
      officials: [...document.querySelectorAll('.official-value')].map(item => item.textContent.trim()),
      competition: text('.competition-title summary'),
      competitionLogos: [...document.querySelectorAll('.competition-logo img')].map(item => item.dataset.exportSource || item.currentSrc || item.src),
      season: text('.season-menu')
    }
  });
  window.collectLavagnaProjectData = projectData;

  const saveProject = async () => {
    const defaultName = cleanName(text('.match-title'));
    const chosenName = window.prompt('Nome del progetto:', defaultName);
    if (chosenName === null) return;
    const fileName = `${cleanName(chosenName).replace(/\.(html?|json|zip)$/i, '')}.html`;
    const state = projectData();
    const clone = document.documentElement.cloneNode(true);
    clone.querySelector('#downloadProjectDialog')?.remove();
    const saved = JSON.stringify(state).replace(/<\/script/gi, '<\\/script');
    clone.querySelector('head')?.insertAdjacentHTML('afterbegin', `<script>window.__downloadedProjectState=${saved};<\/script>`);
    const contents = '<!doctype html>\n' + clone.outerHTML;
    try {
      if ('showSaveFilePicker' in window) {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [{ description: 'Pagina MatchAnalystLab-LineUp', accept: { 'text/html': ['.html'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(contents);
        await writable.close();
        return;
      }
      const file = new Blob([contents], { type: 'text/html;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = fileName;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1500);
    } catch (error) {
      if (error?.name !== 'AbortError') alert('Impossibile salvare il progetto.');
    }
  };

  document.querySelector('#saveProjectBtn')?.addEventListener('click', saveProject);
})();
