(() => {
  const renderEvents = () => {
    for (const side of ['home', 'away']) {
      const team = teams[side];
      const players = [...team.players, ...(team.bench || [])];
      const swaps = [
        ...(team.eventLog || []).filter(event => event.type === 'swap'),
        ...(window.tableSwapEvents?.[side] || [])
      ];
      const rows = [...document.querySelectorAll(`#${side}Panel .player-list .player-row, #${side}Panel .bench-list .player-row`)];
      players.forEach((player, index) => {
        const playerName = `${player[0]} ${player[1]}`;
        const swapDirection = swaps.some(event => event.outgoing === playerName) ? 'exit' : swaps.some(event => event.incoming === playerName) ? 'enter' : '';
        const loggedEvents = [
          ...(team.eventLog || []).filter(event => event.player === playerName && event.icon),
          ...(team.eventLog || []).filter(event => event.type === 'swap' && event.outgoing === playerName).map(event => ({ icon: '➜', minute: event.minute || '' })),
          ...(team.eventLog || []).filter(event => event.type === 'swap' && event.incoming === playerName).map(event => ({ icon: '⬅', minute: event.minute || '' }))
        ];
        // Ogni cartellino resta una voce autonoma: due ammonizioni dello
        // stesso giocatore non devono mai diventare una sola icona.
        const recordedEvents = [
          ...(player._visibleEventMinutes || []),
          ...(team._cardEvents || []).filter(event => event.player === playerName)
        ].map(item => ({
          icon: item.icon,
          minute: item.minute || ''
        }));
        const eventEntries = recordedEvents.length
          ? recordedEvents
          : (player._eventIcons?.length
            ? player._eventIcons.map(icon => ({ icon, minute: '' }))
            : loggedEvents.map(event => ({ icon: event.icon, minute: event.minute || '' })));
        const marker = rows[index]?.querySelector('.player-event');
        if (!marker || !eventEntries.length) return;
        marker.innerHTML = eventEntries.map(({ icon, minute }) => {
          const direction = (icon === '➜' || icon === '⬅') ? swapDirection : '';
          return `<span class="player-event-entry ${direction}"><b>${icon}</b>${minute ? `<small>${minute}'</small>` : ''}</span>`;
        }).join('');
      });
      (team.eventLog || []).filter(event => event.type === 'swap' && event.minute).forEach(event => {
        const outgoingIndex = team.players.findIndex(player => `${player[0]} ${player[1]}` === event.outgoing);
        const incomingIndex = (team.bench || []).findIndex(player => `${player[0]} ${player[1]}` === event.incoming);
        const outgoingMarker = rows[outgoingIndex]?.querySelector('.swap-marker');
        const incomingMarker = rows[team.players.length + incomingIndex]?.querySelector('.swap-marker');
        if (outgoingMarker) outgoingMarker.dataset.minute = event.minute;
        if (incomingMarker) incomingMarker.dataset.minute = event.minute;
      });
    }
  };
  setInterval(renderEvents, 200);
})();
