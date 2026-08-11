(() => {
  const minutes = Array.from({ length: 90 }, (_, index) => String(index + 1));
  const options = minutes.map(minute => `<option value="${minute}">${minute}'</option>`).join('');

  const configure = select => {
    if (!select) return;
    if (select.dataset.matchMinutes !== 'true') {
      const selected = String(select.value || '1').split('+')[0];
      select.innerHTML = options;
      select.value = minutes.includes(selected) ? selected : '1';
      select.dataset.matchMinutes = 'true';
    }
    const card = select.closest('.players-modal-card');
    if (!card || card.querySelector('.recovery-picker')) return;
    const label = document.createElement('label');
    label.className = 'recovery-picker';
    label.append('Recupero ');
    const recovery = document.createElement('select');
    recovery.className = 'recovery-select';
    recovery.innerHTML = `<option value="">+0'</option>${Array.from({ length: 20 }, (_, index) => `<option value="+${index + 1}">+${index + 1}'</option>`).join('')}`;
    label.append(recovery);
    select.insertAdjacentElement('afterend', label);
    recovery.addEventListener('change', () => {
      if (!recovery.value) return;
      const base = String(select.value || '1').split('+')[0];
      const value = `${base}${recovery.value}`;
      let option = [...select.options].find(item => item.value === value);
      if (!option) { option = new Option(`${value}'`, value); select.append(option); }
      select.value = value;
    });
    select.addEventListener('change', () => { if (!String(select.value).includes('+')) recovery.value = ''; });
  };

  const update = () => document.querySelectorAll('.players-modal.open .minute-select').forEach(configure);
  new MutationObserver(update).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('mousedown', event => configure(event.target.closest?.('.minute-select')), true);
  document.addEventListener('focusin', event => configure(event.target.closest?.('.minute-select')), true);
  document.addEventListener('click', event => {
    const confirm = event.target.closest('.minute-confirm');
    const modal = confirm?.closest('.players-modal');
    const minute = modal?.querySelector('.minute-select')?.value || '';
    if (!minute.includes('+')) return;
    setTimeout(() => {
      const update = (items, label, player) => {
        const item = [...(items || [])].reverse().find(entry => entry.label === label && (!player || entry.player === player));
        if (item) item.minute = minute;
      };
      if (modal.id === 'goalMinuteModal' && typeof lastGoalContext !== 'undefined' && lastGoalContext) {
        const { side, index } = lastGoalContext;
        const player = teams[side]?.players?.[index];
        const name = player ? `${player[0]} ${player[1]}` : '';
        update(teams[side]?.eventLog, 'Gol', name);
        update(window.selectedTableEvents?.[side], 'Gol', name);
      }
      if (modal.id === 'cardMinuteModal' && typeof lastCardContext !== 'undefined' && lastCardContext) {
        const { side, index, label } = lastCardContext;
        const player = [...(teams[side]?.players || []), ...(teams[side]?.bench || [])][index];
        const name = player ? `${player[0]} ${player[1]}` : '';
        update(teams[side]?.eventLog, label, name);
        update(window.selectedTableEvents?.[side], label, name);
      }
    }, 0);
  }, true);
  if (!window.__swapMinuteFixInstalled) {
    window.__swapMinuteFixInstalled = true;
    const originalSwapMinutePicker = selectSwapMinute;
    selectSwapMinute = function(side, outIndex, inIndex) {
      originalSwapMinutePicker(side, outIndex, inIndex);
      const modal = document.querySelector('#swapMinuteModal');
      const confirm = modal?.querySelector('.minute-confirm');
      if (!modal || !confirm || confirm.dataset.finalMinuteFix) return;
      confirm.dataset.finalMinuteFix = 'true';
      confirm.addEventListener('click', () => {
        const minute = modal.querySelector('.minute-select')?.value || '';
        const team = teams[side], outgoing = team?.players?.[outIndex], incoming = team?.bench?.[inIndex];
        if (!minute || !outgoing || !incoming) return;
        const outgoingName = `${outgoing[0]} ${outgoing[1]}`;
        const incomingName = `${incoming[0]} ${incoming[1]}`;
        setTimeout(() => {
          const isCurrentChange = event => (event.type === 'swap' || event.label === 'Cambio') &&
            (event.outgoing === outgoingName || String(event.player || '').includes(outgoingName)) &&
            (event.incoming === incomingName || String(event.player || '').includes(incomingName));
          (team.eventLog || []).filter(isCurrentChange).forEach(event => { event.minute = minute; });
          (window.selectedTableEvents?.[side] || []).filter(isCurrentChange).forEach(event => { event.minute = minute; });
          (window.tableSwapEvents?.[side] || []).filter(isCurrentChange).forEach(event => { event.minute = minute; });
        }, 0);
      });
    };
  }
  setInterval(update, 60);
})();
