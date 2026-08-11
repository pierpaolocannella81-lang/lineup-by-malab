(() => {
  const renderPossessionStats = () => {
    const root = document.querySelector('#teamEventTables');
    if (!root || root.querySelector('#possessionStatsTable')) return;
    const card = document.createElement('section');
    card.id = 'possessionStatsTable';
    card.className = 'shot-stats-card possession-stats-card';
    card.innerHTML = `<h3>Possesso palla</h3><table><thead><tr><th>Squadra</th><th>Possesso</th></tr></thead><tbody>${['home', 'away'].map((side, index) => `<tr data-side="${side}"><td>${teams[side].name}</td><td><input type="number" min="0" max="100" value="${index ? 50 : 50}" aria-label="Possesso palla"> <b>%</b></td></tr>`).join('')}</tbody></table><section class="possession-pie-chart" aria-label="Grafico possesso palla"><i class="possession-pie"></i></section>`;
    root.append(card);
    const updatePie = () => {
      const home = Math.max(0, Number(card.querySelector('tr[data-side="home"] input')?.value) || 0), away = Math.max(0, Number(card.querySelector('tr[data-side="away"] input')?.value) || 0), total = home + away || 1, homePart = home / total * 100;
      const homeColor = teams.home.playerColor1 || teams.home.kit || '#ef4444', awayColor = teams.away.playerColor1 || teams.away.kit || '#2563eb', pie = card.querySelector('.possession-pie');
      pie.style.background = `conic-gradient(from 180deg,${homeColor} 0 ${homePart}%,${awayColor} ${homePart}% 100%)`;
      pie.style.borderColor = homeColor.toLowerCase() === '#ffffff' || awayColor.toLowerCase() === '#ffffff' ? '#111' : '#31596d';
      const logoPosition = (start, portion) => {
        const angle = (180 + start + portion / 2) * Math.PI / 180;
        // Centro geometrico del settore colorato: il logo resta sempre
        // all'interno della propria fetta, anche con percentuali diverse.
        const radians = Math.max(.01, portion / 100 * Math.PI * 2);
        const radius = Math.max(.12, Math.min(.46, (4 * Math.sin(radians / 2)) / (3 * radians)));
        const offset = radius * 50;
        return `${50 + Math.sin(angle) * offset}% ${50 - Math.cos(angle) * offset}%`;
      };
      pie.innerHTML = [
        ['home', teams.home.logo, logoPosition(0, homePart)],
        ['away', teams.away.logo, logoPosition(homePart, 100 - homePart)]
      ].map(([side, logo, position]) => logo ? `<img class="possession-pie-logo ${side}" style="left:${position.split(' ')[0]};top:${position.split(' ')[1]}" src="${logo}" alt="">` : '').join('');
    };
    card.addEventListener('input', event => {
      const input = event.target.closest('tr[data-side] input');
      if (input) {
        const side = input.closest('tr')?.dataset.side;
        const value = Math.min(100, Math.max(0, Number(input.value) || 0));
        input.value = value;
        const other = card.querySelector(`tr[data-side="${side === 'home' ? 'away' : 'home'}"] input`);
        if (other) other.value = 100 - value;
      }
      updatePie();
    });
    window.addEventListener('kit-colors-change', updatePie);
    updatePie();
  };
  setInterval(renderPossessionStats, 300);
})();
