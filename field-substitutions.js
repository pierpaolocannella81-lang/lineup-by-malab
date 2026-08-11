(() => {
  const displayName = player => {
    const parts = String(player?.[1] || '').trim().split(/\s+/).filter(Boolean);
    const surname = parts.pop() || '';
    const name = parts[0] || '';
    return `${name ? `${name.charAt(0)}. ` : ''}${surname}`.trim();
  };
  const renderSubstitutions = () => {
    const layer = document.querySelector('#players');
    if (!layer) return;
    layer.querySelectorAll('.field-substitute').forEach(item => item.remove());
    // Rimuove la vecchia etichetta: può disporre le icone in verticale.
    layer.querySelectorAll('.field-substitution').forEach(item => item.remove());
    for (const side of ['home', 'away']) {
      const team = teams[side];
      const normalizeSwap = event => {
        if (event?.outgoing && event?.incoming) return event;
        const text = String(event?.player || '');
        const parts = text.split(/\s*(?:→|â†’)\s*/);
        if (parts.length === 2) return { ...event, outgoing: parts[0].trim(), incoming: parts[1].trim() };
        const match = text.match(/:\s*(.*?)\s+esce\s*(?:·|Â·)\s*(.*?)\s+entra/i);
        return match ? { ...event, outgoing: match[1].trim(), incoming: match[2].trim() } : null;
      };
      const swaps = [
        ...(team.eventLog || []).filter(event => event.type === 'swap' || event.label === 'Cambio'),
        ...(window.tableSwapEvents?.[side] || []),
        ...(window.selectedTableEvents?.[side] || []).filter(event => event.label === 'Cambio')
      ].map(normalizeSwap).filter(Boolean).filter((swap, index, all) =>
        all.findIndex(item => item.outgoing === swap.outgoing && item.incoming === swap.incoming && String(item.minute || '') === String(swap.minute || '')) === index
      );
      swaps.forEach(swap => {
        const outgoing = team.players.findIndex(player => `${player[0]} ${player[1]}` === swap.outgoing);
        const incoming = [...(team.players || []), ...(team.bench || [])].find(player => `${player[0]} ${player[1]}` === swap.incoming);
        const token = outgoing < 0 ? null : layer.querySelector(`.token.${side}[data-index="${outgoing}"]`);
        if (!token || !incoming) return;
        const incomingName = `${incoming[0]} ${incoming[1]}`;
        const icons = [
          ...(team.eventLog || []).filter(event => event.type !== 'swap' && event.player === incomingName && event.icon).map(event => event.icon),
          ...(window.selectedTableEvents?.[side] || []).filter(event => event.label !== 'Cambio' && event.player === incomingName && event.icon).map(event => event.icon)
        ];
        const visibleIcons = (icons.length ? icons : (incoming._eventIcons || [])).filter(icon => icon !== '➜' && icon !== '⬅');
        const label = document.createElement('span');
        label.className = 'field-substitute';
        const iconWidth = 20;
        const iconsMarkup = visibleIcons.map((icon, iconIndex) => `<b style="position:absolute!important;left:${iconIndex * iconWidth}px!important;top:0!important;display:block!important;width:${iconWidth}px!important;text-align:center!important">${icon}</b>`).join('');
        label.innerHTML = `<span>${`(${displayName(incoming)})`}</span><span class="field-substitute-enter">&#8592;</span>${visibleIcons.length ? `<span class="field-substitute-icons" style="display:block!important;position:absolute!important;width:${visibleIcons.length * iconWidth}px!important;height:16px!important;white-space:nowrap!important">${iconsMarkup}</span>` : ''}`;
        label.style.left = token.style.left;
        label.style.top = `calc(${token.style.top} + 39px)`;
        layer.append(label);
      });
    }
  };
  setInterval(renderSubstitutions, 300);
})();
