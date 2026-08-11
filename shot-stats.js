(() => {
  const renderShotStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#shotStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'shotStatsTable';
    card.className = 'shot-stats-card';
    card.innerHTML = `<h3>Statistiche tiri</h3><table><thead><tr><th>Squadra</th><th>Tiri totali</th><th>Tiri riusciti</th><th>% precisione</th></tr></thead><tbody>${['home', 'away'].map(side => `<tr data-side="${side}"><td>${teams[side].name}</td><td><input type="number" min="0" value="0" aria-label="Tiri totali"></td><td><input type="number" min="0" value="0" aria-label="Tiri riusciti"></td><td class="shot-accuracy">0%</td></tr>`).join('')}</tbody></table><section class="shot-chart" aria-label="Grafico tiri"><div class="shot-chart-bars"></div></section>`;
    root.append(card);
    const safe = value => String(value || '').replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[character]));
    const updateChart = () => {
      const data = ['home', 'away'].map(side => {
        const row = card.querySelector(`tr[data-side="${side}"]`);
        const [total, successful] = [...(row?.querySelectorAll('input') || [])].map(input => Math.max(0, Number(input.value) || 0));
        return { side, name: teams[side].name, total, successful };
      });
      const colors = { home: teams.home.playerColor1 || teams.home.kit || '#ef4444', away: teams.away.playerColor1 || teams.away.kit || '#2563eb' };
      const metrics = [
        { label: 'Tiri totali', values: data.map(team => team.total) },
        { label: 'Tiri riusciti', values: data.map(team => team.successful) },
        { label: '% precisione', values: data.map(team => team.total ? Math.round(team.successful / team.total * 100) : 0), maximum: 100 }
      ];
      card.querySelector('.shot-chart-bars').innerHTML = metrics.map(metric => {
        const maximum = metric.maximum || Math.max(1, ...metric.values);
        return `<div class="shot-chart-group"><div class="shot-vertical-bars">${metric.values.map((value, index) => { const color = colors[index ? 'away' : 'home']; const border = String(color).toLowerCase() === '#ffffff' ? 'border:1px solid #111;box-sizing:border-box;' : ''; return `<span><em>${value}${metric.label.startsWith('%') ? '%' : ''}</em><i style="height:${value ? Math.max(4, value / maximum * 100) : 0}%;background:${color};${border}"></i></span>`; }).join('')}</div><b>${metric.label}</b></div>`;
      }).join('');
    };
    const update = row => {
      const [total, successful] = [...row.querySelectorAll('input')].map(input => Math.max(0, Number(input.value) || 0));
      row.querySelector('.shot-accuracy').textContent = total ? `${Math.round(successful / total * 100)}%` : '0%';
      updateChart();
    };
    card.addEventListener('input', event => { if (event.target.matches('input')) update(event.target.closest('tr')); });
    window.addEventListener('kit-colors-change', updateChart);
    updateChart();
  };
  setInterval(renderShotStats, 300);
})();
