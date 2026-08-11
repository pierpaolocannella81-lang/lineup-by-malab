(() => {
  const renderBallStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#ballStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'ballStatsTable';
    card.className = 'shot-stats-card ball-stats-card';
    const fields = [['Palle giocate', 'played'], ['Palle recuperate', 'recovered'], ['Palle perse', 'lost']];
    card.innerHTML = `<h3>Gestione palle</h3><table><thead><tr><th>Squadra</th>${fields.map(([label]) => `<th>${label}</th>`).join('')}</tr></thead><tbody>${['home', 'away'].map(side => `<tr data-side="${side}"><td>${teams[side].name}</td>${fields.map(([, key]) => `<td><input type="number" min="0" value="0" data-ball="${key}" aria-label="${key}"></td>`).join('')}</tr>`).join('')}</tbody></table>`;
    root.append(card);
  };
  setInterval(renderBallStats, 300);
})();
