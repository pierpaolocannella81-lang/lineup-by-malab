(() => {
  const readZipProject = buffer => {
    const bytes = new Uint8Array(buffer), view = new DataView(buffer);
    let end = -1;
    for (let index = bytes.length - 22; index >= Math.max(0, bytes.length - 65557); index -= 1) {
      if (view.getUint32(index, true) === 0x06054b50) { end = index; break; }
    }
    if (end < 0) throw new Error('Archivio non valido');
    const centralOffset = view.getUint32(end + 16, true), entries = view.getUint16(end + 10, true);
    let offset = centralOffset;
    for (let index = 0; index < entries; index += 1) {
      if (view.getUint32(offset, true) !== 0x02014b50) break;
      const compression = view.getUint16(offset + 10, true), size = view.getUint32(offset + 20, true);
      const nameLength = view.getUint16(offset + 28, true), extraLength = view.getUint16(offset + 30, true), commentLength = view.getUint16(offset + 32, true);
      const localOffset = view.getUint32(offset + 42, true);
      const name = new TextDecoder().decode(bytes.slice(offset + 46, offset + 46 + nameLength));
      if (name.endsWith('progetto.lavagnacalcio.json')) {
        if (compression !== 0) throw new Error('Formato ZIP non supportato');
        const localNameLength = view.getUint16(localOffset + 26, true), localExtraLength = view.getUint16(localOffset + 28, true);
        const start = localOffset + 30 + localNameLength + localExtraLength;
        return JSON.parse(new TextDecoder().decode(bytes.slice(start, start + size)));
      }
      offset += 46 + nameLength + extraLength + commentLength;
    }
    throw new Error('Dati progetto non trovati');
  };

  const readHtmlProject = contents => {
    const marker = 'window.__downloadedProjectState=';
    const start = contents.indexOf(marker);
    if (start < 0) throw new Error('Dati progetto non trovati');
    const jsonStart = start + marker.length;
    const jsonEnd = contents.indexOf(';</script>', jsonStart);
    if (jsonEnd < 0) throw new Error('Dati progetto non validi');
    return JSON.parse(contents.slice(jsonStart, jsonEnd));
  };

  const applyProject = project => {
    for (const side of ['home', 'away']) {
      if (project.teams?.[side]) Object.assign(teams[side], project.teams[side]);
      if (Array.isArray(project.positions?.[side])) {
        positions[side].splice(0, positions[side].length, ...project.positions[side]);
      }
    }
    if (typeof project.seconds === 'number') seconds = project.seconds;
    if (project.period) document.querySelector('#period').value = project.period;
    if (project.selectedTableEvents) window.selectedTableEvents = project.selectedTableEvents;
    if (project.tableSwapEvents) window.tableSwapEvents = project.tableSwapEvents;

    const fields = project.fields || {};
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element && value != null) element.textContent = value;
    };
    const setValue = (selector, value) => {
      const element = document.querySelector(selector);
      if (element && value != null) element.value = value;
    };
    setText('.match-title', fields.title);
    setValue('#homeName', fields.homeName);
    setValue('#awayName', fields.awayName);
    setText('#homeScore', fields.homeScore);
    setText('#awayScore', fields.awayScore);
    setText('.match-day', fields.giornata);
    setText('.match-date', fields.data);
    setText('.venue-value-fixed', fields.campo);
    ['referee', 'assistant1', 'assistant2'].forEach((key, index) => setText(`.official-value[data-official="${index}"]`, fields.officials?.[key]));
    setText('.competition-title summary', fields.competition);
    setText('.season-title summary', fields.season);

    render();
    buildTokens();
    window.renderRecordedPlayerMinutes?.();
    window.dispatchEvent(new Event('lavagna-project-opened'));
    document.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const openProject = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip,.json,.lavagnacalcio.json,.html,.htm,application/zip,application/json,text/html';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const contents = file.name.toLowerCase().endsWith('.zip') ? null : await file.text();
        const project = file.name.toLowerCase().endsWith('.zip')
          ? readZipProject(await file.arrayBuffer())
          : /\.html?$/i.test(file.name)
            ? readHtmlProject(contents)
            : JSON.parse(contents);
        if (!project || !project.teams) throw new Error('Progetto non valido');
        applyProject(project);
      } catch {
        alert('Impossibile aprire il progetto selezionato. Scegli una pagina HTML, un file ZIP o il file progetto.lavagnacalcio.json creato da Salva progetto.');
      }
    };
    input.click();
  };

  document.querySelector('#openProjectBtn')?.addEventListener('click', openProject);
})();
