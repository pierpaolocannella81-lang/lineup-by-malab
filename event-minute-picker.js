(() => {
  const openMinutePicker = context => {
    let modal = document.querySelector('#genericEventMinuteModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'genericEventMinuteModal';
      modal.className = 'players-modal';
      document.body.append(modal);
    }
    const options = Array.from({ length: 120 }, (_, index) => `<option value="${index + 1}">${index + 1}'</option>`).join('');
    modal.innerHTML = `<div class="players-modal-card"><button class="modal-close" aria-label="Chiudi">×</button><h2>${context.icon} Minuto dell'evento</h2><p>Seleziona il minuto dell'evento</p><select class="minute-select">${options}</select><button class="minute-confirm">Conferma</button></div>`;
    modal.classList.add('open');
    modal.querySelector('.modal-close').onclick = () => modal.classList.remove('open');
    modal.querySelector('.minute-confirm').onclick = () => {
      const minute = modal.querySelector('.minute-select').value;
      const name = `${context.player[0]} ${context.player[1]}`;
      const applyMinute = items => {
        const item = [...(items || [])].reverse().find(event => event.label === context.label && event.player === name && !event.minute);
        if (item) item.minute = minute;
      };
      applyMinute(teams[context.side].eventLog);
      applyMinute(window.selectedTableEvents?.[context.side]);
      context.player._visibleEventMinutes = context.player._visibleEventMinutes || [];
      context.player._visibleEventMinutes.push({ minute, icon: context.icon });
      window.renderRecordedPlayerMinutes?.();
      modal.classList.remove('open');
    };
  };

  document.addEventListener('click', event => {
    const button = event.target.closest('#iconPlayerModal [data-event-player]');
    if (!button) return;
    const modal = button.closest('#iconPlayerModal');
    const side = modal?.dataset.tableSide || modal?.dataset.minuteSide;
    const label = modal?.dataset.tableLabel || modal?.dataset.minuteLabel;
    const icon = modal?.dataset.tableIcon || '';
    if (!side || label !== 'Assist') return;
    const player = [...teams[side].players, ...(teams[side].bench || [])][Number(button.dataset.eventPlayer)];
    if (player) setTimeout(() => openMinutePicker({ side, label, icon, player }), 0);
  }, true);
})();
