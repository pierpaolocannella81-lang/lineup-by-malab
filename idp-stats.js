(() => {
  const renderIdpStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#idpStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'idpStatsTable';
    card.className = 'shot-stats-card idp-stats-card';
    card.innerHTML = `<h3>IDP</h3><table><thead><tr><th>Squadra</th><th>IDP</th></tr></thead><tbody>${['home', 'away'].map(side => `<tr data-side="${side}"><td>${teams[side].name}</td><td><input type="number" min="0" step="0.1" value="0" aria-label="IDP"></td></tr>`).join('')}</tbody></table><section class="shot-chart single-chart" aria-label="Grafico IDP"><div class="shot-chart-bars"></div></section>`;
    root.append(card);
    const updateChart = () => { const values = ['home', 'away'].map(side => Number(card.querySelector(`tr[data-side="${side}"] input`)?.value) || 0), maximum = Math.max(1, ...values), colors = { home: teams.home.playerColor1 || teams.home.kit || '#ef4444', away: teams.away.playerColor1 || teams.away.kit || '#2563eb' }; card.querySelector('.shot-chart-bars').innerHTML = `<div class="shot-chart-group"><div class="shot-vertical-bars">${values.map((value, index) => { const color = colors[index ? 'away' : 'home']; const border = color.toLowerCase() === '#ffffff' ? 'border:1px solid #111;box-sizing:border-box;' : ''; return `<span><em>${value}</em><i style="height:${value ? Math.max(4, value / maximum * 100) : 0}%;background:${color};${border}"></i></span>`; }).join('')}</div><b>IDP</b></div>`; };
    card.addEventListener('input', updateChart);
    window.addEventListener('kit-colors-change', updateChart);
    updateChart();
  };
  setInterval(renderIdpStats, 300);
})();
