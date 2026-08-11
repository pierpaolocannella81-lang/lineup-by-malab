(() => {
  const eventIconsFor = (side, player) => {
    const name = `${player[0]} ${player[1]}`;
    const swaps = [
      ...(teams[side].eventLog || []).filter(event => event.type === 'swap'),
      ...(window.tableSwapEvents?.[side] || [])
    ];
    const direction = swaps.some(event => event.outgoing === name) ? 'exit' : swaps.some(event => event.incoming === name) ? 'enter' : '';
    const source = [
      ...(teams[side].eventLog || []).filter(event => event.type !== 'swap' && event.player === name && event.icon),
      ...(window.selectedTableEvents?.[side] || []).filter(event => event.label !== 'Cambio' && event.player === name && event.icon)
    ].map(event => ({ icon: event.icon, direction: event.label === 'Esce' ? 'exit' : event.label === 'Entra' ? 'enter' : '' }));
    return source.length ? source : (player._eventIcons || []).map(icon => ({ icon, direction: (icon === '➜' || icon === '⬅') ? direction : '' }));
  };
  const renderColumns = () => {
    const layer = document.querySelector('#players');
    if (!layer) return;
    for (const side of ['home', 'away']) {
      teams[side].players.forEach((player, index) => {
        const icons = eventIconsFor(side, player);
        let marker = layer.querySelector(`.field-event-outside[data-side="${side}"][data-index="${index}"]`);
        if (!icons.length) return;
        const token = layer.querySelector(`.token.${side}[data-index="${index}"]`);
        if (!token) return;
        if (!marker) {
          marker = document.createElement('span');
          marker.className = 'field-event field-event-outside';
          marker.dataset.side = side;
          marker.dataset.index = index;
          layer.append(marker);
        }
        marker.style.left = `calc(${token.style.left} + 26px)`;
        marker.style.top = token.style.top;
        marker.innerHTML = icons.map(item => `<span class="${item.direction || ''}">${item.icon}</span>`).join('');
      });
    }
  };
  setInterval(renderColumns, 200);
})();
