(() => {
  const renderPassStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#passStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'passStatsTable';
    card.className = 'shot-stats-card pass-stats-card';
    card.innerHTML = `<h3>Statistiche passaggi</h3><table><thead><tr><th>Squadra</th><th>Passaggi totali</th><th>Passaggi riusciti</th><th>% precisione</th></tr></thead><tbody>${['home', 'away'].map(side => `<tr data-side="${side}"><td>${teams[side].name}</td><td><input type="number" min="0" value="0" aria-label="Passaggi totali"></td><td><input type="number" min="0" value="0" aria-label="Passaggi riusciti"></td><td class="shot-accuracy">0%</td></tr>`).join('')}</tbody></table><section class="shot-chart" aria-label="Grafico passaggi"><div class="shot-chart-bars"></div></section>`;
    root.append(card);
    const updateChart = () => {
      const data = ['home', 'away'].map(side => { const row = card.querySelector(`tr[data-side="${side}"]`); const [total, successful] = [...row.querySelectorAll('input')].map(input => Math.max(0, Number(input.value) || 0)); return { total, successful }; });
      const colors = { home: teams.home.playerColor1 || teams.home.kit || '#ef4444', away: teams.away.playerColor1 || teams.away.kit || '#2563eb' }, metrics = [{ label: 'PASSAGGI TOTALI', values: data.map(team => team.total) }, { label: 'PASSAGGI RIUSCITI', values: data.map(team => team.successful) }, { label: '% PRECISIONE', values: data.map(team => team.total ? Math.round(team.successful / team.total * 100) : 0), maximum: 100, suffix: '%' }];
      card.querySelector('.shot-chart-bars').innerHTML = metrics.map(metric => { const maximum = metric.maximum || Math.max(1, ...metric.values); return `<div class="shot-chart-group"><div class="shot-vertical-bars">${metric.values.map((value, index) => { const color = colors[index ? 'away' : 'home']; const border = color.toLowerCase() === '#ffffff' ? 'border:1px solid #111;box-sizing:border-box;' : ''; return `<span><em>${value}${metric.suffix || ''}</em><i style="height:${value ? Math.max(4, value / maximum * 100) : 0}%;background:${color};${border}"></i></span>`; }).join('')}</div><b>${metric.label}</b></div>`; }).join('');
    };
    card.addEventListener('input', event => {
      if (!event.target.matches('input')) return;
      const row = event.target.closest('tr');
      const [total, successful] = [...row.querySelectorAll('input')].map(input => Math.max(0, Number(input.value) || 0));
      row.querySelector('.shot-accuracy').textContent = total ? `${Math.round(successful / total * 100)}%` : '0%';
      updateChart();
    });
    window.addEventListener('kit-colors-change', updateChart);
    updateChart();
  };
  setInterval(renderPassStats, 300);
})();
