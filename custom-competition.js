(() => {
  const storageKey = 'lavagnaCalcioCustomCompetitions';
  const cleanupKey = 'lavagnaCalcioCompetitionMenuReset20260809';
  let editingIndex = null;

  // Riparte dal solo pulsante “Nuova competizione”; le competizioni create
  // successivamente continuano invece a essere memorizzate normalmente.
  try {
    if (!localStorage.getItem(cleanupKey)) {
      localStorage.removeItem(storageKey);
      localStorage.setItem(cleanupKey, '1');
    }
  } catch {}

  const savedCompetitions = () => {
    try {
      const values = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(values) ? values.filter(item => item?.name) : [];
    } catch { return []; }
  };
  const storeCompetitions = values => localStorage.setItem(storageKey, JSON.stringify(values));

  const renderSavedOptions = () => {
    const list = document.querySelector('.competition-options');
    const creator = list?.querySelector('.create-competition-option');
    if (!list || !creator) return;
    list.querySelectorAll('.custom-competition-row').forEach(row => row.remove());
    savedCompetitions().forEach((competition, index) => {
      const row = document.createElement('div');
      row.className = 'custom-competition-row';

      const choose = document.createElement('button');
      choose.type = 'button'; choose.className = 'saved-custom-competition';
      choose.dataset.competitionIndex = String(index); choose.textContent = competition.name;

      const remove = document.createElement('button');
      remove.type = 'button'; remove.className = 'delete-custom-competition';
      remove.dataset.competitionIndex = String(index); remove.title = 'Elimina'; remove.textContent = '×';

      const edit = document.createElement('button');
      edit.type = 'button'; edit.className = 'edit-custom-competition';
      edit.dataset.competitionIndex = String(index); edit.title = 'Modifica'; edit.textContent = '●';

      row.append(choose, remove, edit);
      list.insertBefore(row, creator);
    });
  };

  const asDataUrl = file => new Promise(resolve => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });

  const modal = () => {
    let root = document.querySelector('#customCompetitionModal');
    if (root) return root;
    root = document.createElement('div');
    root.id = 'customCompetitionModal';
    root.className = 'custom-competition-modal';
    root.innerHTML = `<div class="custom-competition-card"><h2>Crea competizione</h2><label>Nome della competizione<input class="custom-competition-name" autocomplete="off" placeholder="Es. Torneo Estivo"></label><label>Logo della competizione<input class="custom-competition-logo" type="file" accept="image/*"></label><div class="custom-competition-actions"><button type="button" class="custom-competition-cancel">Annulla</button><button type="button" class="custom-competition-confirm">Crea</button></div></div>`;
    document.body.append(root);
    const close = () => { root.classList.remove('open'); editingIndex = null; };
    root.querySelector('.custom-competition-cancel').addEventListener('click', close);
    root.addEventListener('click', event => { if (event.target === root) close(); });
    root.querySelector('.custom-competition-confirm').addEventListener('click', async () => {
      const name = root.querySelector('.custom-competition-name').value.trim();
      if (!name) { root.querySelector('.custom-competition-name').focus(); return; }
      const uploadedLogo = await asDataUrl(root.querySelector('.custom-competition-logo').files?.[0]);
      const competitions = savedCompetitions();
      const index = editingIndex == null
        ? competitions.findIndex(item => item.name.toLowerCase() === name.toLowerCase())
        : editingIndex;
      const previous = index >= 0 ? competitions[index] : null;
      const competition = { name, logo: uploadedLogo || previous?.logo || '' };
      if (index >= 0) competitions.splice(index, 1, competition); else competitions.push(competition);
      storeCompetitions(competitions);
      renderSavedOptions();

      const menu = document.querySelector('.competition-title');
      const summary = menu?.querySelector('summary');
      if (menu && summary) {
        summary.textContent = competition.name;
        menu.classList.toggle('has-competition', Boolean(competition.logo));
        menu.style.setProperty('--competition-icon', competition.logo ? `url('${competition.logo}')` : 'none');
        menu.open = false;
      }
      close();
      document.dispatchEvent(new Event('change', { bubbles: true }));
    });
    return root;
  };

  const openModal = (competition = null, index = null) => {
    const root = modal();
    editingIndex = index;
    root.querySelector('h2').textContent = competition ? 'Modifica competizione' : 'Crea competizione';
    root.querySelector('.custom-competition-confirm').textContent = competition ? 'Salva' : 'Crea';
    root.querySelector('.custom-competition-name').value = competition?.name || '';
    root.querySelector('.custom-competition-logo').value = '';
    root.classList.add('open');
    root.querySelector('.custom-competition-name').focus();
  };

  document.addEventListener('click', event => {
    const edit = event.target.closest('.edit-custom-competition');
    if (edit) {
      event.preventDefault(); event.stopImmediatePropagation();
      const index = Number(edit.dataset.competitionIndex), competition = savedCompetitions()[index];
      if (competition) openModal(competition, index);
      return;
    }
    const remove = event.target.closest('.delete-custom-competition');
    if (remove) {
      event.preventDefault(); event.stopImmediatePropagation();
      const competitions = savedCompetitions();
      competitions.splice(Number(remove.dataset.competitionIndex), 1);
      storeCompetitions(competitions);
      renderSavedOptions();
      return;
    }
    const saved = event.target.closest('.saved-custom-competition');
    if (saved) {
      event.preventDefault(); event.stopImmediatePropagation();
      const competition = savedCompetitions()[Number(saved.dataset.competitionIndex)];
      const menu = document.querySelector('.competition-title'), summary = menu?.querySelector('summary');
      if (!competition || !menu || !summary) return;
      summary.textContent = competition.name;
      menu.classList.toggle('has-competition', Boolean(competition.logo));
      menu.style.setProperty('--competition-icon', competition.logo ? `url('${competition.logo}')` : 'none');
      menu.open = false;
      document.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }
    if (!event.target.closest('.create-competition-option')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    openModal();
  }, true);

  setTimeout(renderSavedOptions, 0);
})();
