(() => {
  const renderMatchActionStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#matchActionsStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'matchActionsStatsTable';
    card.className = 'shot-stats-card match-actions-stats-card';
    const fields = [['Corner', 'corners'], ['Punizioni', 'free-kicks'], ['Rigori', 'penalties'], ['Falli', 'fouls'], ['Cartellini gialli', 'yellow-cards'], ['Cartellini rossi', 'red-cards']];
    card.innerHTML = `<h3>Azioni partita</h3><table><thead><tr><th>Squadra</th>${fields.map(([label]) => `<th>${label}</th>`).join('')}</tr></thead><tbody>${['home', 'away'].map(side => `<tr data-side="${side}"><td>${teams[side].name}</td>${fields.map(([, key]) => `<td><input type="number" min="0" value="0" data-action="${key}" aria-label="${key}"></td>`).join('')}</tr>`).join('')}</tbody></table>`;
    root.append(card);
  };
  setInterval(renderMatchActionStats, 300);
})();
