(() => {
  const safe = value => String(value ?? '').replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]);
  const minuteOf = event => event?.minute ?? event?.minuto ?? event?.time ?? event?._minute ?? '';
  const displayMinute = event => {
    const minute = minuteOf(event);
    return minute === '' || minute === null || minute === undefined ? '' : `${safe(minute)}'`;
  };
  const eventIconFor = event => event?.icon || ({ Gol: '⚽', Assist: '👟', Ammonito: '🟨', Espulso: '🟥' }[event?.label] || '');
  window.tableSwapEvents = window.tableSwapEvents || { home: [], away: [] };
  const rememberSwap = (side, outgoing, incoming, minute) => {
    if (!side || !outgoing || !incoming) return;
    const changes = window.tableSwapEvents[side] || (window.tableSwapEvents[side] = []);
    const key = `${outgoing}|${incoming}|${minute || ''}`;
    if (!changes.some(change => `${change.outgoing}|${change.incoming}|${change.minute || ''}` === key)) changes.push({ type: 'swap', outgoing, incoming, minute: minute || '' });
  };
  const parseSwap = text => {
    const arrow = String(text || '').split(' → ');
    if (arrow.length === 2) return { outgoing: arrow[0].trim(), incoming: arrow[1].trim() };
    const match = String(text || '').match(/:\s*(.*?)\s+esce\s*·\s*(.*?)\s+entra/i);
    return match ? { outgoing: match[1].trim(), incoming: match[2].trim() } : null;
  };
  const deleteButton = (side, kind, event) => `<button type="button" class="event-table-delete" title="Elimina evento" data-delete-side="${side}" data-delete-event="${encodeURIComponent(JSON.stringify({ kind, icon: event.icon || '', minute: minuteOf(event), player: event.player || '', outgoing: event.outgoing || '', incoming: event.incoming || '' }))}">&times;</button>`;
  if (!window.__eventTableDeleteInstalled) {
    window.__eventTableDeleteInstalled = true;
    document.addEventListener('click', event => {
      const button = event.target.closest('.event-table-delete');
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      const side = button.dataset.deleteSide;
      let target;
      try { target = JSON.parse(decodeURIComponent(button.dataset.deleteEvent)); } catch { return; }
      const same = item => {
        if (target.kind === 'swap') {
          const parsed = item.type === 'swap' ? item : item.label === 'Cambio' ? parseSwap(item.player) : null;
          const sameMinute = String(minuteOf(item)) === String(target.minute) || minuteOf(item) === '';
          return parsed && parsed.outgoing === target.outgoing && parsed.incoming === target.incoming && sameMinute;
        }
        // Alcuni eventi ricevono il minuto solo in fase di visualizzazione:
        // in quel caso il confronto per giocatore, tipo e icona identifica la riga corretta.
        const sameMinute = String(minuteOf(item)) === String(target.minute) || minuteOf(item) === '';
        const sameIcon = !target.icon || !item.icon || item.icon === target.icon;
        return item.label === target.kind && item.player === target.player && sameIcon && sameMinute;
      };
      teams[side].eventLog = (teams[side].eventLog || []).filter(item => !same(item));
      if (window.selectedTableEvents?.[side]) window.selectedTableEvents[side] = window.selectedTableEvents[side].filter(item => !same(item));
      if (target.kind === 'swap') window.tableSwapEvents[side] = (window.tableSwapEvents?.[side] || []).filter(item => !(item.outgoing === target.outgoing && item.incoming === target.incoming && String(minuteOf(item)) === String(target.minute)));
      const allPlayers = [...(teams[side].players || []), ...(teams[side].bench || [])];
      const resolvedIcon = target.icon || ({ Gol: '⚽', Assist: '👟', Ammonito: '🟨', Espulso: '🟥' }[target.kind] || '');
      const clearDisplayedIcon = (name, icon) => {
        const playerIndex = allPlayers.findIndex(item => `${item[0]} ${item[1]}` === name);
        if (playerIndex < 0 || !icon) return;
        const row = document.querySelectorAll(`#${side}Panel .player-list .player-row, #${side}Panel .bench-list .player-row`)[playerIndex];
        row?.querySelectorAll('.player-event-entry').forEach(entry => { if (entry.querySelector('b')?.textContent.trim() === icon) entry.remove(); });
        const playerEvent = row?.querySelector('.player-event');
        if (playerEvent && !playerEvent.children.length) playerEvent.remove();
        const fieldEvent = document.querySelector(`.field-event-outside[data-side="${side}"][data-index="${playerIndex}"]`);
        fieldEvent?.querySelectorAll('span').forEach(item => { if (item.textContent.trim() === icon) item.remove(); });
        if (fieldEvent && !fieldEvent.children.length) fieldEvent.remove();
      };
      const removeIcon = (name, icon) => {
        const player = allPlayers.find(item => `${item[0]} ${item[1]}` === name);
        if (!player) return;
        if (icon) {
          const index = (player._eventIcons || []).lastIndexOf(icon);
          if (index >= 0) player._eventIcons.splice(index, 1);
          player._visibleEventMinutes = (player._visibleEventMinutes || []).filter(item => item.icon !== icon);
          clearDisplayedIcon(name, icon);
        }
      };
      if (target.kind === 'swap') {
        const arrowRows = item => (item.label === 'Esce' && item.player === target.outgoing) || (item.label === 'Entra' && item.player === target.incoming);
        teams[side].eventLog = (teams[side].eventLog || []).filter(item => !arrowRows(item));
        if (window.selectedTableEvents?.[side]) window.selectedTableEvents[side] = window.selectedTableEvents[side].filter(item => !arrowRows(item));
        removeIcon(target.outgoing, '➜');
        removeIcon(target.outgoing, '⬅');
        removeIcon(target.incoming, '➜');
        removeIcon(target.incoming, '⬅');
      } else removeIcon(target.player, resolvedIcon);
      if (false && target.kind === 'Gol') {
        const assists = (teams[side].eventLog || []).filter(item => item.label === 'Assist' && String(minuteOf(item)) === String(target.minute));
        const isMatchingAssist = item => item.label === 'Assist' && String(minuteOf(item)) === String(target.minute);
        teams[side].eventLog = (teams[side].eventLog || []).filter(item => !isMatchingAssist(item));
        if (window.selectedTableEvents?.[side]) window.selectedTableEvents[side] = window.selectedTableEvents[side].filter(item => !isMatchingAssist(item));
        assists.forEach(item => removeIcon(item.player, item.icon || '👟'));
      }
      // La X elimina esclusivamente l'evento della propria riga.
      window.dispatchEvent(new CustomEvent('lavagna-event-deleted', { detail: { side, target } }));
      renderTables();
      window.renderRecordedPlayerMinutes?.();
      setTimeout(() => {
        renderTables();
        window.renderRecordedPlayerMinutes?.();
      }, 0);
    });
  }
  // Compatibilità con le X delle tabelle create dalla versione precedente del progetto.
  if (!window.__legacyEventTableDeleteInstalled) {
    window.__legacyEventTableDeleteInstalled = true;
    document.addEventListener('click', event => {
      const legacyButton = event.target.closest('.event-delete');
      if (!legacyButton) return;
      const row = legacyButton.closest('tr');
      const table = legacyButton.closest('table');
      const block = legacyButton.closest('.event-team-block');
      if (!row || !table || !block) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const side = [...document.querySelectorAll('.event-team-block')].indexOf(block) === 0 ? 'home' : 'away';
      const title = `${table.querySelector('thead')?.textContent || ''} ${table.previousElementSibling?.textContent || ''}`.toLowerCase();
      const cells = row.querySelectorAll('td');
      const minute = (cells[0]?.textContent || '').replace("'", '').trim();
      const cleanName = value => String(value || '').replace(/×/g, '').replace(/^[⚽👟🟨🟥⇄➜⬅\s]+/u, '').trim();
      const icons = { gol: '⚽', assist: '👟', ammonito: '🟨', espulso: '🟥' };
      let target;
      if (title.includes('cambi')) {
        const names = (cells[2]?.textContent || '').replace(/×/g, '').split(/\n|\r/).map(cleanName).filter(Boolean);
        target = { kind: 'swap', minute, outgoing: names[0] || '', incoming: names[1] || '' };
      } else {
        const kind = title.includes('gialli') ? 'Ammonito' : title.includes('rossi') ? 'Espulso' : title.includes('assist') && !title.includes('gol') ? 'Assist' : 'Gol';
        const playerCell = kind === 'Gol' ? cells[1] : cells[2];
        target = { kind, minute, player: cleanName(playerCell?.textContent), icon: icons[kind.toLowerCase()] || '' };
      }
      const proxy = document.createElement('button');
      proxy.type = 'button';
      proxy.className = 'event-table-delete';
      proxy.dataset.deleteSide = side;
      proxy.dataset.deleteEvent = encodeURIComponent(JSON.stringify(target));
      document.body.append(proxy);
      proxy.click();
      proxy.remove();
    }, true);
  }
  if (!window.__tableSwapCaptureInstalled) {
    window.__tableSwapCaptureInstalled = true;
    document.addEventListener('click', event => {
      const confirm = event.target.closest('#swapMinuteModal .minute-confirm');
      if (!confirm) return;
      setTimeout(() => {
        const note = document.querySelector('#swapNote')?.textContent || '';
        const side = ['home', 'away'].find(key => note.includes(teams[key].name));
        const swap = parseSwap(note);
        // Conserva il minuto completo nei recuperi: 90+5' e non solo 5'.
        const minute = (note.match(/(\d+(?:\+\d+)?)'/) || [])[1] || document.querySelector('#swapMinuteModal .minute-select')?.value || '';
        if (side && swap) rememberSwap(side, swap.outgoing, swap.incoming, minute);
      }, 0);
    });
  }
  const visibleMinuteFor = (side, event) => {
    if (minuteOf(event) !== '' || event?.label === 'Assist') return minuteOf(event);
    const team = teams[side];
    const players = [...(team.players || []), ...(team.bench || [])];
    const index = players.findIndex(player => `${player[0]} ${player[1]}` === event.player);
    const icon = eventIconFor(event);
    const recorded = players[index]?._visibleEventMinutes || [];
    const stored = [...recorded].reverse().find(item => item.icon === icon)?.minute;
    if (stored) return stored;
    const row = index < 0 ? null : document.querySelectorAll(`#${side}Panel .player-list .player-row, #${side}Panel .bench-list .player-row`)[index];
    const entry = [...(row?.querySelectorAll('.player-event-entry') || [])].reverse().find(item => item.querySelector('b')?.textContent.trim() === icon);
    return entry?.querySelector('small')?.textContent.replace("'", '').trim() || row?.querySelector('.player-minute,.player-event-minute,.visible-minute-label,.event-minute-manual,.swap-minute')?.textContent.replace("'", '').trim() || '';
  };
  const renderTables = () => {
    const workspace = document.querySelector('.workspace');
    const actions = document.querySelector('.field-actions');
    if (!workspace || !actions) return;
    let root = document.querySelector('#teamEventTables');
    if (!root) {
      root = document.createElement('section');
      root.id = 'teamEventTables';
      actions.after(root);
    }
      const tableSignature = JSON.stringify(['home', 'away'].map(side => ({
      name: teams[side].name,
      logo: teams[side].logo || '',
      events: teams[side].eventLog || [],
      selected: window.selectedTableEvents?.[side] || [],
      swaps: window.tableSwapEvents?.[side] || [],
      recorded: [...(teams[side].players || []), ...(teams[side].bench || [])].map(player => player._visibleEventMinutes || []),
      cards: teams[side]._cardEvents || []
    })));
    if (root.dataset.tableSignature === tableSignature) return;
    root.dataset.tableSignature = tableSignature;
    root.innerHTML = ['home', 'away'].map(side => {
      const team = teams[side];
      const selectedEvents = window.selectedTableEvents?.[side] || [];
      // Le registrazioni visibili sono la sorgente certa dei cartellini
      // multipli: manteniamo una riga per ogni minuto selezionato.
      const recordedCards = [...(team.players || []), ...(team.bench || [])].flatMap(player =>
        (player._visibleEventMinutes || [])
          .filter(item => item.icon === '🟨' || item.icon === '🟥')
          .map(item => ({ icon: item.icon, label: item.icon === '🟨' ? 'Ammonito' : 'Espulso', player: `${player[0]} ${player[1]}`, minute: item.minute || '', _recordedOnly: true }))
      );
      const events = [...(team.eventLog || []), ...selectedEvents, ...(team._cardEvents || []), ...recordedCards].map(event => ({ ...event, minute: minuteOf(event) || visibleMinuteFor(side, event) })).reduce((unique, event) => {
        const key = event.type === 'swap' || event.label === 'Cambio'
          ? `swap|${event.outgoing || ''}|${event.incoming || ''}|${event.player || ''}|${minuteOf(event)}`
          : `${event.label || ''}|${event.player || ''}|${event.icon || ''}|${minuteOf(event)}`;
        const existing = unique.get(key);
        // I dati completi dell'evento (ad esempio il motivo del cartellino)
        // prevalgono sulla copia usata solo per conservare il minuto.
        unique.set(key, existing && event._recordedOnly
          ? { ...event, ...existing, minute: minuteOf(event) || minuteOf(existing) }
          : { ...existing, ...event, minute: minuteOf(event) || minuteOf(existing) });
        return unique;
      }, new Map());
      const orderedEvents = [...events.values()].sort((a, b) => (Number(minuteOf(a) || 999) - Number(minuteOf(b) || 999)) || ((a.order || 0) - (b.order || 0)));
      const renderRows = items => items.map(event => {
        if (event.type === 'swap') return `<tr><td>${displayMinute(event)}</td><td>&harr;</td><td>${safe(event.outgoing)} &rarr; ${safe(event.incoming)}${deleteButton(side, 'swap', event)}</td></tr>`;
        const reason = ['Ammonito', 'Espulso'].includes(event.label) && event.reason ? ` (${safe(event.reason)})` : '';
        return `<tr><td>${displayMinute(event)}</td><td>${safe(event.icon || '')}</td><td>${safe(event.player || '')}${reason}${deleteButton(side, event.label, event)}</td></tr>`;
      }).join('') || '<tr><td colspan="3" class="no-events">Nessun evento</td></tr>';
      const table = (title, items) => `<section class="event-type-table"><h4>${title}</h4><table><thead><tr><th>Min.</th><th></th><th>Giocatore</th></tr></thead><tbody>${renderRows(items)}</tbody></table></section>`;
      const cardTable = (title, items) => {
        const rows = items.map(event => `<tr><td>${displayMinute(event)}</td><td>${safe(event.icon || '')}</td><td>${safe(event.player || '')}</td><td>${safe(event.reason || '')}${deleteButton(side, event.label, event)}</td></tr>`).join('') || '<tr><td colspan="4" class="no-events">Nessun evento</td></tr>';
        return `<section class="event-type-table card-event-table"><h4>${title}</h4><table><thead><tr><th>Min.</th><th></th><th>Giocatore</th><th>Motivo</th></tr></thead><tbody>${rows}</tbody></table></section>`;
      };
      const goalAssistTable = () => {
        const goals = orderedEvents.filter(event => event.label === 'Gol');
        const assists = orderedEvents.filter(event => event.label === 'Assist');
        const usedAssists = new Set();
        const rows = goals.map(goal => {
          let assistIndex = assists.findIndex((event, index) => !usedAssists.has(index) && String(minuteOf(event)) === String(minuteOf(goal)));
          if (assistIndex < 0) assistIndex = assists.findIndex((event, index) => !usedAssists.has(index) && Number(event.order || 0) >= Number(goal.order || 0));
          if (assistIndex < 0) assistIndex = assists.findIndex((event, index) => !usedAssists.has(index));
          if (assistIndex >= 0) usedAssists.add(assistIndex);
          const assist = goal.assist || (assistIndex >= 0 ? assists[assistIndex].player : '') || '';
          return `<tr><td>${displayMinute(goal)}</td><td class="goal-player-cell">${safe(goal.player || '')}</td><td class="assist-player-cell">${safe(assist)}${deleteButton(side, 'Gol', goal)}</td></tr>`;
        }).join('') || '<tr><td colspan="3" class="no-events">Nessun evento</td></tr>';
        return `<section class="event-type-table goal-assist-table"><h4>⚽ Gol e assist</h4><table><thead><tr><th>Min.</th><th>Gol</th><th>Assist</th></tr></thead><tbody>${rows}</tbody></table></section>`;
      };
      const changeTable = () => {
        const changes = [
          ...orderedEvents.filter(event => event.type === 'swap'),
          ...(window.tableSwapEvents?.[side] || []),
          ...selectedEvents.filter(event => event.label === 'Cambio').map(event => {
            const swap = parseSwap(event.player);
            return swap ? { minute: minuteOf(event), ...swap } : null;
          }).filter(Boolean)
        ].filter((event, index, items) => items.findIndex(item => `${item.minute || ''}|${item.outgoing || ''}|${item.incoming || ''}` === `${event.minute || ''}|${event.outgoing || ''}|${event.incoming || ''}`) === index);
        changes.sort((first, second) => (Number(minuteOf(first) || 999) - Number(minuteOf(second) || 999)) || ((first.order || 0) - (second.order || 0)));
        const rows = changes.map(event => `<tr><td>${displayMinute(event)}</td><td>${safe(event.outgoing || '')}</td><td>${safe(event.incoming || '')}${deleteButton(side, 'swap', event)}</td></tr>`).join('') || '<tr><td colspan="3" class="no-events">Nessun evento</td></tr>';
        return `<section class="event-type-table change-table"><h4>⇄ Cambi</h4><table><thead><tr><th>Min.</th><th>Esce</th><th>Entra</th></tr></thead><tbody>${rows}</tbody></table></section>`;
      };
      const header = team.logo ? `<img src="${team.logo}" alt="${safe(team.name)}" style="width:88px!important;height:88px!important;max-width:none!important;object-fit:contain">` : `<span>${safe(team.name)}</span>`;
      return `<article class="team-events-card"><h3 class="team-events-header">${header}</h3><div class="event-type-tables">${goalAssistTable()}${cardTable('🟨 Ammoniti', orderedEvents.filter(event => event.label === 'Ammonito'))}${cardTable('🟥 Espulsi', orderedEvents.filter(event => event.label === 'Espulso'))}${changeTable()}</div></article>`;
    }).join('') + '<aside class="card-reasons-legend"><b>Legenda cartellini:</b> F: Fallo · FM: Fallo Mano · P: Proteste · AS: Anti Sportivo · R: Reazione · DG: Doppio Giallo</aside>';
  };
  setInterval(renderTables, 300);
})();
