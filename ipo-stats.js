(() => {
  const renderIpoStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#ipoStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'ipoStatsTable';
    card.className = 'shot-stats-card ipo-stats-card';
    const fields = [['IPO', 'ipo'], ['IPO Azioni', 'actions'], ['IPO Palle Inattive', 'set-pieces']];
    card.innerHTML = `<h3>IPO</h3><table><thead><tr><th>Squadra</th>${fields.map(([label]) => `<th>${label}</th>`).join('')}</tr></thead><tbody>${['home', 'away'].map(side => `<tr data-side="${side}"><td>${teams[side].name}</td>${fields.map(([, key]) => `<td><input type="number" min="0" step="0.1" value="0" data-ipo="${key}" aria-label="${key}"></td>`).join('')}</tr>`).join('')}</tbody></table><section class="shot-chart" aria-label="Grafico IPO"><div class="shot-chart-bars"></div></section>`;
    root.append(card);
    const updateChart = () => { const colors = { home: teams.home.playerColor1 || teams.home.kit || '#ef4444', away: teams.away.playerColor1 || teams.away.kit || '#2563eb' }, metrics = fields.map(([label, key]) => ({ label: label.toUpperCase(), values: ['home', 'away'].map(side => Number(card.querySelector(`tr[data-side="${side}"] [data-ipo="${key}"]`)?.value) || 0) })); card.querySelector('.shot-chart-bars').innerHTML = metrics.map(metric => { const maximum = Math.max(1, ...metric.values); return `<div class="shot-chart-group"><div class="shot-vertical-bars">${metric.values.map((value, index) => { const color = colors[index ? 'away' : 'home']; const border = color.toLowerCase() === '#ffffff' ? 'border:1px solid #111;box-sizing:border-box;' : ''; return `<span><em>${value}</em><i style="height:${value ? Math.max(4, value / maximum * 100) : 0}%;background:${color};${border}"></i></span>`; }).join('')}</div><b>${metric.label}</b></div>`; }).join(''); };
    card.addEventListener('input', updateChart);
    window.addEventListener('kit-colors-change', updateChart);
    updateChart();
  };
  setInterval(renderIpoStats, 300);
})();
