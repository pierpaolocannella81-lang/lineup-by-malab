(() => {
  const cleanName = value => String(value || 'nuova-partita')
    .trim().replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, '-').slice(0, 70) || 'nuova-partita';

  const assetName = url => {
    const parsed = new URL(url, location.href);
    return decodeURIComponent(parsed.pathname.split('/').pop() || 'file');
  };

  const localRead = (url, type) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = type === 'blob' ? 'blob' : 'text';
    request.onload = () => (request.status === 0 || (request.status >= 200 && request.status < 300))
      ? resolve(type === 'blob' ? request.response : request.responseText)
      : reject(new Error('File non disponibile'));
    request.onerror = () => reject(new Error('File non disponibile'));
    request.send();
  });
  const fileText = async url => {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      // I file locali rispondono con stato 0, ma il loro contenuto è valido.
      if (!response.ok && response.status !== 0) throw new Error('File non disponibile');
      return await response.text();
    } catch { return localRead(url, 'text'); }
  };
  const fileBlob = async url => {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      // I file locali rispondono con stato 0, ma il loro contenuto è valido.
      if (!response.ok && response.status !== 0) throw new Error('File non disponibile');
      return await response.blob();
    } catch { return localRead(url, 'blob'); }
  };

  const projectFiles = async state => {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelector('#downloadProjectDialog')?.remove();
    const assets = [];
    const addAsset = (element, attribute) => {
      const source = element.getAttribute(attribute);
      if (!source || source.startsWith('data:')) return;
      const url = new URL(source, location.href).href;
      const name = assetName(url);
      element.setAttribute(attribute, name);
      if (!assets.some(asset => asset.url === url)) assets.push({ url, name });
    };

    clone.querySelectorAll('link[rel="stylesheet"]').forEach(link => addAsset(link, 'href'));
    clone.querySelectorAll('script[src]').forEach(script => addAsset(script, 'src'));
    const saved = JSON.stringify(state).replace(/<\/script/gi, '<\\/script');
    clone.querySelector('head')?.insertAdjacentHTML('afterbegin', `<script>window.__downloadedProjectState=${saved};<\/script>`);

    const files = [{ name: 'index.html', contents: '<!doctype html>\n' + clone.outerHTML }];
    const unavailable = [];
    for (const asset of assets) {
      try { files.push({ name: asset.name, contents: await fileText(asset.url) }); }
      catch { unavailable.push(asset.name); }
    }
    // Include anche i file non richiamati direttamente dalla pagina, così lo ZIP
    // corrisponde all'intera cartella originale del progetto.
    const originalFolderFiles = [
      'action-icons.css', 'app.js', 'assist-rigore.js', 'ball-stats.js', 'custom-competition.js',
      'entry-arrow.js', 'event-minute-picker.js', 'event-overrides.css', 'event-render.js',
      'events-tables.css', 'events-tables.js', 'field-event-columns.js', 'field-substitutions.css',
      'field-substitutions.js', 'idp-stats.js', 'ipo-stats.js', 'match-actions-stats.js',
      'minute-recovery.js', 'official-icons-data.js', 'overrides.css', 'pass-stats.js', 'pdf-export.js',
      'possession-stats.js', 'project-download.js', 'project-save.js', 'referee-icon.css',
      'referee-icon.js', 'season-editable.js', 'shirt-overrides.js', 'shot-stats.css', 'shot-stats.js',
      'yellow-card-reason.js', 'extra-shirt-styles.css', 'extra-shirt-styles.js',
      'lineup-selector.css', 'lineup-selector.js', 'period-stats.css', 'period-stats.js',
      'period-possession-chart.css', 'period-possession-chart.js', 'project-open.js', 'package.json', 'main.js', 'README-MAC.md'
    ];
    const includedNames = new Set(files.map(file => file.name));
    for (const name of originalFolderFiles) {
      if (includedNames.has(name)) continue;
      try { files.push({ name, contents: await fileText(new URL(name, location.href).href) }); includedNames.add(name); }
      catch { unavailable.push(name); }
    }
    for (const name of ['LND_Sardegna.png', 'Coppa-Italia-Eccellenza.png', 'Partita-Amichevole.png', 'referee-whistle.png', 'assistant-flags.png']) {
      try { files.push({ name: `assets/${name}`, contents: await fileBlob(new URL(`assets/${name}`, location.href).href) }); }
      catch { unavailable.push(`assets/${name}`); }
    }
    files.push({ name: 'progetto.lavagnacalcio.json', contents: JSON.stringify(state, null, 2) });
    return files;
  };

  const crcTable = (() => {
    const table = new Uint32Array(256);
    for (let index = 0; index < 256; index += 1) {
      let value = index;
      for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? (value >>> 1) ^ 0xedb88320 : value >>> 1;
      table[index] = value >>> 0;
    }
    return table;
  })();
  const crc32 = bytes => {
    let value = 0xffffffff;
    for (const byte of bytes) value = (value >>> 8) ^ crcTable[(value ^ byte) & 255];
    return (value ^ 0xffffffff) >>> 0;
  };
  const join = chunks => {
    const result = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.length, 0));
    let offset = 0;
    chunks.forEach(chunk => { result.set(chunk, offset); offset += chunk.length; });
    return result;
  };
  const downloadFallback = async (folderName, state, suppliedFiles = null) => {
    const files = suppliedFiles || await projectFiles(state);
    const encoder = new TextEncoder(), local = [], central = [];
    let offset = 0;
    for (const file of files) {
      const name = encoder.encode(`${folderName}/${file.name}`);
      const data = typeof file.contents === 'string' ? encoder.encode(file.contents) : new Uint8Array(await file.contents.arrayBuffer());
      const checksum = crc32(data);
      const localHeader = new Uint8Array(30), localView = new DataView(localHeader.buffer);
      localView.setUint32(0, 0x04034b50, true); localView.setUint16(4, 20, true); localView.setUint16(6, 0x0800, true);
      localView.setUint32(14, checksum, true); localView.setUint32(18, data.length, true); localView.setUint32(22, data.length, true);
      localView.setUint16(26, name.length, true);
      local.push(localHeader, name, data);
      const centralHeader = new Uint8Array(46), centralView = new DataView(centralHeader.buffer);
      centralView.setUint32(0, 0x02014b50, true); centralView.setUint16(4, 20, true); centralView.setUint16(6, 20, true); centralView.setUint16(8, 0x0800, true);
      centralView.setUint32(16, checksum, true); centralView.setUint32(20, data.length, true); centralView.setUint32(24, data.length, true);
      centralView.setUint16(28, name.length, true); centralView.setUint32(42, offset, true);
      central.push(centralHeader, name);
      offset += localHeader.length + name.length + data.length;
    }
    const centralData = join(central), end = new Uint8Array(22), endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true); endView.setUint16(8, files.length, true); endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralData.length, true); endView.setUint32(16, offset, true);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([join([...local, centralData, end])], { type: 'application/zip' }));
    link.download = `${folderName}.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 4000);
  };

  const filesFromDirectory = async (directory, prefix = '') => {
    const files = [];
    for await (const [name, handle] of directory.entries()) {
      const path = `${prefix}${name}`;
      if (handle.kind === 'file') files.push({ name: path, contents: await handle.getFile() });
      else if (handle.kind === 'directory') files.push(...await filesFromDirectory(handle, `${path}/`));
    }
    return files;
  };

  // Alternativa compatibile anche con i browser che non consentono la lettura
  // diretta di una cartella da una pagina aperta localmente.
  const filesFromFolderInput = () => new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.setAttribute('webkitdirectory', '');
    input.setAttribute('directory', '');
    input.style.display = 'none';
    document.body.append(input);
    input.addEventListener('change', () => {
      const selected = [...input.files];
      input.remove();
      if (!selected.length) { reject(new DOMException('Selezione annullata', 'AbortError')); return; }
      const files = selected.map(file => {
        const relative = file.webkitRelativePath || file.name;
        const parts = relative.split('/');
        // La prima parte è il nome della cartella scelta, non va inserita nello ZIP.
        return { name: parts.length > 1 ? parts.slice(1).join('/') : file.name, contents: file };
      });
      resolve(files);
    }, { once: true });
    input.click();
  });

  window.exportProjectZip = async folderName => {
    const state = window.__latestLavagnaProjectData || window.collectLavagnaProjectData?.() || {};
    // Il browser richiede che l'utente autorizzi la lettura della cartella sorgente.
    alert('Seleziona questa cartella originale del progetto:\nC:\\Users\\Pcann\\Documents\\Codex\\2026-07-28\\cr\\outputs\\calcio-tattico');
    const originalFiles = 'showDirectoryPicker' in window
      ? await window.showDirectoryPicker({ id: 'lavagna-calcio-sorgente', startIn: 'documents', mode: 'read' }).then(source => filesFromDirectory(source))
      : await filesFromFolderInput();
    const generatedFiles = await projectFiles(state);
    const index = generatedFiles.find(file => file.name === 'index.html');
    const data = generatedFiles.find(file => file.name === 'progetto.lavagnacalcio.json');
    // La nota delle vecchie esportazioni non è un file del progetto e non va
    // ricopiata nello ZIP: la cartella conterrà soltanto i file effettivi.
    const files = originalFiles.filter(file => ![
      'index.html',
      'progetto.lavagnacalcio.json',
      'file-non-inclusi.txt'
    ].includes(file.name));
    if (index) files.push(index);
    if (data) files.push(data);
    await downloadFallback(cleanName(folderName), state, files);
  };

  const saveFolder = async folderName => {
    const state = window.collectLavagnaProjectData?.() || {};
    if (!('showDirectoryPicker' in window)) {
      await downloadFallback(folderName, state);
      alert('Il browser non permette la scelta della cartella: è stato scaricato il file del progetto.');
      return;
    }
    const destination = await window.showDirectoryPicker({ id: 'lavagna-calcio-desktop', startIn: 'desktop', mode: 'readwrite' });
    const baseFolder = destination.name.toLowerCase() === 'calcio-tattico'
      ? destination
      : await destination.getDirectoryHandle('calcio-tattico', { create: true });
    const folder = await baseFolder.getDirectoryHandle(folderName, { create: true });
    const files = await projectFiles(state);
    for (const file of files) {
      const parts = file.name.split('/');
      const fileName = parts.pop();
      let destinationFolder = folder;
      for (const part of parts) destinationFolder = await destinationFolder.getDirectoryHandle(part, { create: true });
      const handle = await destinationFolder.getFileHandle(fileName, { create: true });
      const writable = await handle.createWritable();
      await writable.write(file.contents);
      await writable.close();
    }
  };

  // Usata anche dal pulsante "Salva progetto": esporta la cartella completa
  // con pagina, script, fogli di stile, immagini e dati della partita.
  window.exportCompleteProjectFolder = async folderName => {
    await saveFolder(cleanName(folderName));
  };

  const openDownloadDialog = () => {
    let dialog = document.querySelector('#downloadProjectDialog');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'downloadProjectDialog';
      dialog.innerHTML = '<div class="download-project-card"><h2>Download progetto</h2><label>Nome della cartella del progetto<input class="download-project-name" autocomplete="off"></label><p class="download-project-note">Il progetto verrà salvato in Desktop\\calcio-tattico. Quando il browser apre la scelta, conferma Desktop.</p><div><button type="button" class="download-project-cancel">Annulla</button><button type="button" class="download-project-confirm">Salva progetto</button></div></div>';
      document.body.append(dialog);
      const close = () => dialog.classList.remove('open');
      dialog.querySelector('.download-project-cancel').onclick = close;
      dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
      dialog.querySelector('.download-project-confirm').onclick = async () => {
        const input = dialog.querySelector('.download-project-name');
        const button = dialog.querySelector('.download-project-confirm');
        button.disabled = true;
        try {
          await saveFolder(cleanName(input.value));
          close();
        } catch (error) {
          if (error?.name !== 'AbortError') alert('Impossibile salvare tutti i file del progetto.');
        } finally {
          button.disabled = false;
        }
      };
    }
    const input = dialog.querySelector('.download-project-name');
    input.value = cleanName(document.querySelector('.match-title')?.textContent || 'nuova-partita');
    dialog.classList.add('open');
    input.focus(); input.select();
  };

  document.querySelector('#downloadProjectBtn')?.addEventListener('click', openDownloadDialog);
})();
