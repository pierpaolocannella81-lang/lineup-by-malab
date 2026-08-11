(() => {
  const labels = ['C', 'VC', 'U'];
  const incomingLabel = player => {
    const parts = String(player?.[1] || '').trim().split(/\s+/).filter(Boolean);
    const surname = parts.pop() || '', first = parts[0] || surname;
    const flags = ['C', 'VC'].filter(label => player?._listFlags?.[label]);
    const year = String(player?._underDetail || '').replace(/\D/g, '').slice(0, 2);
    const underYear = player?._listFlags?.U && year ? ` (${year})` : '';
    return `(${first.charAt(0)}. ${surname}${flags.length ? ` (${flags.join(', ')})` : ''}${underYear})`;
  };
  const updateIncomingFlags = () => {
    document.querySelectorAll('.field-substitution[data-side][data-in-index]').forEach(item => {
      const player = teams[item.dataset.side]?.bench?.[Number(item.dataset.inIndex)];
      if (!player) return;
      let name = item.querySelector('.incoming-player-name');
      if (!name) {
        name = document.createElement('span');
        name.className = 'incoming-player-name';
        [...item.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
        item.insertBefore(name, item.querySelector('b') || item.firstChild);
      }
      name.textContent = incomingLabel(player);
    });
  };
  const updateFieldFlags = () => {
    for (const side of ['home', 'away']) {
      (teams[side].players || []).forEach((player, index) => {
        const label = document.querySelector(`.field-surname[data-side="${side}"][data-index="${index}"]`);
        if (!label) return;
        const parts = String(player?.[1] || '').trim().split(/\s+/).filter(Boolean);
        const surname = parts.pop() || '', first = parts[0] || surname;
        const flags = ['C', 'VC'].filter(flag => player?._listFlags?.[flag]);
        const year = String(player?._underDetail || '').replace(/\D/g, '').slice(0, 2);
        const underYear = player?._listFlags?.U && year ? ` (${year})` : '';
        label.textContent = `${first.charAt(0)}. ${surname}${flags.length ? ` (${flags.join(', ')})` : ''}${underYear}`;
      });
    }
  };
  const originalShowFieldSubstitution = showFieldSubstitution;
  showFieldSubstitution = (...args) => {
    originalShowFieldSubstitution(...args);
    updateIncomingFlags();
  };
  const addLegend = () => {
    for (const side of ['home', 'away']) {
      const panel = document.querySelector(`#${side}Panel`);
      const coach = panel?.querySelector('.coach-footer');
      if (!panel || !coach || panel.querySelector('.player-list-legend')) continue;
      const legend = document.createElement('div');
      legend.className = 'player-list-legend';
      legend.textContent = 'C = Capitano · VC = Vice Capitano · U = Under';
      coach.before(legend);
    }
  };
  const addFlags = () => {
    for (const side of ['home', 'away']) {
      const team = teams[side];
      const rows = [...document.querySelectorAll(`#${side}Panel .player-list .player-row`), ...document.querySelectorAll(`#${side}Panel .bench-list .player-row`)];
      const players = [...(team.players || []), ...(team.bench || [])];
      rows.forEach((row, index) => {
        const player = players[index];
        if (!player || row.querySelector('.player-list-flags')) return;
        player._listFlags ||= {};
        player._underDetail = String(player._underDetail || '').replace(/\D/g, '').slice(0, 2);
        const flags = document.createElement('span');
        flags.className = 'player-list-flags';
        flags.setAttribute('aria-label', 'Selezioni giocatore');
        labels.forEach(label => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'player-list-flag';
          button.textContent = label;
          button.title = label;
          button.classList.toggle('selected', Boolean(player._listFlags[label]));
          button.onclick = event => {
            event.preventDefault();
            event.stopPropagation();
            player._listFlags[label] = !player._listFlags[label];
            button.classList.toggle('selected', player._listFlags[label]);
            updateFieldFlags();
            updateIncomingFlags();
            document.dispatchEvent(new Event('input', { bubbles: true }));
          };
          flags.append(button);
        });
        row.append(flags);
        const underInput = document.createElement('input');
        underInput.type = 'text';
        underInput.className = 'under-detail-input';
        underInput.placeholder = '00';
        underInput.maxLength = 2;
        underInput.value = String(player._underDetail || '').replace(/\D/g, '').slice(0, 2);
        underInput.disabled = !player._listFlags.U;
        underInput.title = 'Disponibile soltanto quando selezioni U';
        underInput.oninput = event => {
          const year = event.currentTarget.value.replace(/\D/g, '').slice(0, 2);
          event.currentTarget.value = year;
          player._underDetail = year;
          updateFieldFlags();
          updateIncomingFlags();
          document.dispatchEvent(new Event('input', { bubbles: true }));
        };
        flags.append(underInput);
        const underButton = [...flags.querySelectorAll('.player-list-flag')].find(button => button.textContent === 'U');
        underButton?.addEventListener('click', () => {
          underInput.disabled = !player._listFlags.U;
          if (underInput.disabled) underInput.blur();
        });
      });
    }
  };
  setTimeout(() => {
    addFlags();
    addLegend();
    updateFieldFlags();
    updateIncomingFlags();
    new MutationObserver(() => { addFlags(); addLegend(); }).observe(document.body, { childList: true, subtree: true });
  }, 0);
})();
