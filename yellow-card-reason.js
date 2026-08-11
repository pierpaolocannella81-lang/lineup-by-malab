(() => {
  let selected = null;

  document.addEventListener('click', event => {
    const button = event.target.closest('#iconPlayerModal [data-event-player]');
    if (!button) return;
    const modal = button.closest('#iconPlayerModal');
    const label = modal?.dataset.tableLabel || modal?.dataset.minuteLabel;
    const side = modal?.dataset.tableSide || modal?.dataset.minuteSide;
    if (!['Ammonito', 'Espulso'].includes(label) || !side) return;
    const player = [...teams[side].players, ...(teams[side].bench || [])][Number(button.dataset.eventPlayer)];
    if (player) selected = { side, label, player: `${player[0]} ${player[1]}` };
  }, true);

  const addReasonChoice = () => {
    const modal = document.querySelector('#cardMinuteModal.open');
    const card = modal?.querySelector('.players-modal-card');
    if (!card || !selected || card.querySelector('.yellow-reason-select')) return;
    const select = document.createElement('select');
    select.className = 'yellow-reason-select';
    select.innerHTML = selected.label === 'Espulso'
      ? '<option value="F">F</option><option value="FM">FM</option><option value="AS">AS</option><option value="P">P</option><option value="R">R</option><option value="DG">DG</option>'
      : '<option value="F">F</option><option value="FM">FM</option><option value="AS">AS</option><option value="P">P</option><option value="R">R</option>';
    const label = document.createElement('p');
    label.className = 'yellow-reason-label';
    label.textContent = `Prima scegli il motivo del cartellino ${selected.label === 'Espulso' ? 'rosso' : 'giallo'}, poi il minuto`;
    label.style.cssText = 'margin:12px 0 6px;font-weight:800;color:#fff';
    select.style.cssText = 'display:block;width:100%;margin-bottom:12px;padding:9px;background:#17394c;color:#fff;border:1px solid #6c9ab0;border-radius:6px;font-weight:800';
    card.querySelector('.minute-select')?.before(label, select);
  };
  setInterval(addReasonChoice, 150);
  new MutationObserver(addReasonChoice).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', event => {
    const confirm = event.target.closest('#cardMinuteModal .minute-confirm');
    const reasonSelect = document.querySelector('#cardMinuteModal .yellow-reason-select');
    if (!confirm || !selected || !reasonSelect) return;
    const reason = reasonSelect.value;
    const setReason = items => {
      const item = [...(items || [])].reverse().find(entry => entry.label === selected.label && entry.player === selected.player);
      if (item) item.reason = reason;
    };
    setTimeout(() => {
      setReason(teams[selected.side].eventLog);
      setReason(window.selectedTableEvents?.[selected.side]);
      selected = null;
    }, 0);
  }, true);

  const openReasonPicker = ({ side, index, icon, label }) => {
    const player = [...teams[side].players, ...(teams[side].bench || [])][index];
    if (!player) return;
    let modal = document.querySelector('#cardReasonModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cardReasonModal';
      modal.className = 'players-modal';
      document.body.append(modal);
    }
    const options = label === 'Espulso'
      ? ['F', 'FM', 'AS', 'P', 'R', 'DG']
      : ['F', 'FM', 'AS', 'P', 'R'];
    modal.innerHTML = `<div class="players-modal-card"><button class="modal-close" aria-label="Chiudi">×</button><h2>${icon} Motivo del cartellino</h2><p>Scegli il motivo prima del minuto</p><select class="card-reason-choice">${options.map(value => `<option value="${value}">${value}</option>`).join('')}</select><button class="reason-confirm">Continua</button></div>`;
    modal.classList.add('open');
    modal.querySelector('.modal-close').onclick = () => modal.classList.remove('open');
    modal.querySelector('.reason-confirm').onclick = () => {
      const reason = modal.querySelector('.card-reason-choice').value;
      const name = `${player[0]} ${player[1]}`;
      const setReason = items => {
        const item = [...(items || [])].reverse().find(entry => entry.label === label && entry.player === name);
        if (item) item.reason = reason;
      };
      setReason(teams[side].eventLog);
      setReason(window.selectedTableEvents?.[side]);
      selected = { side, label, player: name };
      modal.classList.remove('open');
      openCardMinutePicker(side, index, label);
    };
  };

  const originalPlayerPicker = selectPlayerForIcon;
  selectPlayerForIcon = function(side, icon, label) {
    originalPlayerPicker(side, icon, label);
    if (!['Ammonito', 'Espulso'].includes(label)) return;
    const modal = document.querySelector('#iconPlayerModal');
    modal?.querySelectorAll('[data-event-player]').forEach(button => {
      button.addEventListener('click', () => {
        const player = [...teams[side].players, ...(teams[side].bench || [])][Number(button.dataset.eventPlayer)];
        if (player) selected = { side, label, player: `${player[0]} ${player[1]}` };
        setTimeout(addReasonChoice, 0);
      }, { capture: true, once: true });
    });
  };
})();
