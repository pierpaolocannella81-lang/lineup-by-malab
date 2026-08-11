(() => {
  const rows = ['Totale', '', '1° Tempo', '2° Tempo', '', '0-15', '16-30', '30-45', '45+', '46-60', '61-75', '75-90', '90+'];
  const field = (key, label) => `<td><input class="period-value" type="number" min="0" value="0" data-field="${key}" aria-label="${label}"></td>`;

  const updateLogo = card => {
    const side = card.dataset.side;
    const logo = card.querySelector('.period-team-logo');
    if (!logo) return;
    const source = teams[side]?.logo || '';
    logo.hidden = !source;
    if (source && logo.src !== source) logo.src = source;
  };
  const updateSharedTitle = root => {
    let title = root.querySelector('#periodStatsSharedTitle');
    if (!title) {
      title = document.createElement('section');
      title.id = 'periodStatsSharedTitle';
      title.innerHTML = '<div class="period-team-marker home"><img class="period-shared-logo home" alt="Logo Team 1"><span class="period-team-color home" aria-label="Colore Team 1"></span></div><h3>Statistiche per periodi</h3><div class="period-team-marker away"><span class="period-team-color away" aria-label="Colore Team 2"></span><img class="period-shared-logo away" alt="Logo Team 2"></div>';
      root.append(title);
    }
    [['home', teams.home.logo || ''], ['away', teams.away.logo || '']].forEach(([side, source]) => {
      const logo = title.querySelector(`.period-shared-logo.${side}`);
      const color = title.querySelector(`.period-team-color.${side}`);
      logo.hidden = !source;
      if (source && logo.src !== source) logo.src = source;
      if (color) color.style.backgroundColor = teams[side].playerColor1 || teams[side].kit || (side === 'home' ? '#e53935' : '#1d4ed8');
    });
  };
  const syncAwayPossession = root => {
    const homeRows = root.querySelectorAll('#periodStatsTable tr[data-period]');
    const awayRows = root.querySelectorAll('#periodStatsAwayTable tr[data-period]');
    homeRows.forEach((row, index) => {
      const homeInput = row.querySelector('[data-field="possession-percent"]');
      const awayInput = awayRows[index]?.querySelector('[data-field="possession-percent"]');
      if (!homeInput || !awayInput) return;
      const homeValue = Math.min(100, Math.max(0, Number(homeInput.value) || 0));
      homeInput.value = homeValue;
      awayInput.value = 100 - homeValue;
    });
  };
  const syncPrecision = row => {
    const value = name => Math.max(0, Number(row.querySelector(`[data-field="${name}"]`)?.value) || 0);
    const totalShots = value('shots'), successfulShots = value('on-target');
    const totalPasses = value('passes'), successfulPasses = value('completed-passes');
    row.querySelector('.shot-percent').textContent = totalShots ? `${Math.round(successfulShots / totalShots * 100)}%` : '0%';
    row.querySelector('.pass-percent').textContent = totalPasses ? `${Math.round(successfulPasses / totalPasses * 100)}%` : '0%';
  };
  const createCard = (root, side) => {
    const card = document.createElement('section');
    card.id = side === 'home' ? 'periodStatsTable' : 'periodStatsAwayTable';
    card.className = 'period-stats-card';
    card.dataset.side = side;
    card.innerHTML = `<h3>Statistiche per periodi</h3><div class="period-stats-scroll"><table>
      <thead><tr class="period-logo-row"><th><img class="period-team-logo" alt="Logo squadra"></th><th colspan="12"></th></tr><tr><th>Periodo</th><th>Gol</th><th class="period-separator" aria-label="Separatore"></th><th>Tiri tot.</th><th>Tiri sp.</th><th>% prec.</th><th class="period-separator period-gap" aria-label="Separatore"></th><th>Pass.</th><th>Pass. riusc.</th><th>% prec.</th><th class="period-separator period-gap" aria-label="Separatore"></th><th>Min. poss.</th><th>% poss.</th></tr></thead>
      <tbody>${rows.map((label, index) => label ? `<tr data-period="${index}"><th scope="row">${label}</th>${field('goals', 'Gol ' + label)}<td class="period-separator"></td>${field('shots', 'Tiri totali ' + label)}${field('on-target', 'Tiri nello specchio ' + label)}<td class="period-calculated shot-percent">0%</td><td class="period-separator period-gap"></td>${field('passes', 'Passaggi ' + label)}${field('completed-passes', 'Passaggi riusciti ' + label)}<td class="period-calculated pass-percent">0%</td><td class="period-separator period-gap"></td>${field('possession-minutes', 'Minuti possesso ' + label)}${field('possession-percent', 'Percentuale possesso ' + label)}</tr>` : `<tr class="period-spacer" aria-hidden="true"><td colspan="13"></td></tr>`).join('')}</tbody>
    </table></div>`;
    root.append(card);
    updateLogo(card);
    if (side === 'away') card.querySelectorAll('[data-field="possession-percent"]').forEach(input => { input.readOnly = true; input.value = 100; });

    card.addEventListener('input', event => {
      const row = event.target.closest('tr[data-period]');
      if (row) syncPrecision(row);
      if (side === 'home' && event.target.matches('[data-field="possession-percent"]')) syncAwayPossession(root);
    });
  };
  const render = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root) return;
    updateSharedTitle(root);
    const cards = [...root.querySelectorAll('#periodStatsTable,#periodStatsAwayTable')];
    if (cards.length) { cards.forEach(card => { updateLogo(card); card.querySelectorAll('tr[data-period]').forEach(syncPrecision); }); syncAwayPossession(root); return; }
    createCard(root, 'home');
    createCard(root, 'away');
    syncAwayPossession(root);
  };
  setInterval(render, 300);
})();
