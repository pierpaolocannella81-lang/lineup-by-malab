(() => {
  const periodLabels = ['0-15', '16-30', '30-45', '45+', '46-60', '61-75', '75-90', '90+'];
  const esc = value => String(value).replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  const renderChart = () => {
    const root = document.querySelector('#teamEventTables');
    const home = root?.querySelector('#periodStatsTable');
    const away = root?.querySelector('#periodStatsAwayTable');
    if (!root || !home || !away) return;
    let chart = root.querySelector('#periodPossessionChart');
    if (!chart) {
      chart = document.createElement('section');
      chart.id = 'periodPossessionChart';
      chart.className = 'period-possession-chart';
      root.append(chart);
    }
    const values = card => [...card.querySelectorAll('tr[data-period]')].slice(3).map(row => Math.min(100, Math.max(0, Number(row.querySelector('[data-field="possession-percent"]')?.value) || 0)));
    const homeValues = values(home), awayValues = values(away);
    const width = 1000, height = 245, left = 48, right = 20, top = 23, bottom = 50, plotWidth = width - left - right, plotHeight = height - top - bottom;
    const x = index => left + index * plotWidth / Math.max(1, periodLabels.length - 1);
    const y = value => top + (100 - value) / 100 * plotHeight;
    const points = data => data.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(' ');
    const line = (data, color, shape) => `<polyline class="period-possession-line ${shape}" points="${points(data)}" style="stroke:${esc(color)}"></polyline>${data.map((value, index) => `<circle cx="${x(index)}" cy="${y(value)}" r="3.5" style="fill:${esc(color)}"></circle>`).join('')}`;
    const grid = [0, 25, 50, 75, 100].map(value => `<g><line x1="${left}" y1="${y(value)}" x2="${width - right}" y2="${y(value)}"></line><text x="${left - 8}" y="${y(value) + 3}" text-anchor="end">${value}%</text></g>`).join('');
    const labels = periodLabels.map((label, index) => `<text x="${x(index)}" y="${height - 20}" text-anchor="middle">${esc(label)}</text>`).join('');
    const homeColor = teams.home.playerColor1 || teams.home.kit || '#ef4444';
    const awayColor = teams.away.playerColor1 || teams.away.kit || '#2563eb';
    chart.innerHTML = `<h3>Andamento possesso palla</h3><div class="period-chart-legend"><span><i style="background:${esc(homeColor)}"></i>${esc(teams.home.name || 'Team 1')}</span><span><i style="background:${esc(awayColor)}"></i>${esc(teams.away.name || 'Team 2')}</span></div><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafico a linee della percentuale di possesso palla per periodo"><title>Andamento possesso palla per periodo</title><g class="period-chart-grid">${grid}</g><g class="period-chart-labels">${labels}</g>${line(homeValues, homeColor, 'home')}${line(awayValues, awayColor, 'away')}</svg>`;
  };
  setInterval(renderChart, 300);
})();
