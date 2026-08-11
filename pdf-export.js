/* Esportazione diretta del riepilogo partita in PDF. */
const embeddedCompetitionIcons = {"Campionato Eccellenza":"data:image/png;base64,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","Coppa Italia Eccellenza":"data:image/png;base64,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","Partita Amichevole":"data:image/png;base64,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"};
function downloadPdfFromCanvas(canvas, compact = false) {
  const jpeg = atob(canvas.toDataURL('image/jpeg', 0.92).split(',')[1]);
  const pageWidth = 1000;
  const renderedHeight = pageWidth * canvas.height / canvas.width;
  // La pagina cresce con il contenuto: nessuna tabella viene tagliata in fondo.
  const pageHeight = compact ? Math.ceil(renderedHeight) : Math.max(1440, Math.ceil(renderedHeight));
  const renderedTop = 0;
  const objects = [];
  const add = value => (objects.push(value), objects.length);
  const image = add(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n${jpeg}\nendstream`);
  const content = `q\n${pageWidth} 0 0 ${renderedHeight} 0 ${renderedTop} cm\n/Im0 Do\nQ`;
  const contents = add(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  const page = add(`<< /Type /Page /Parent 4 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 ${image} 0 R >> >> /Contents ${contents} 0 R >>`);
  const pages = add(`<< /Type /Pages /Kids [${page} 0 R] /Count 1 >>`);
  const catalog = add(`<< /Type /Catalog /Pages ${pages} 0 R >>`);
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index++) pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const bytes = new Uint8Array(pdf.length);
  for (let index = 0; index < pdf.length; index++) bytes[index] = pdf.charCodeAt(index) & 0xff;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
  link.download = 'lavagna-calcio.pdf';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

function drawPdfShirt(context, x, y, team, player, scale = 1) {
  const keeper = String(player[2] || '').toUpperCase() === 'POR';
  const one = keeper ? (team.keeperColor1 || '#facc15') : (team.playerColor1 || team.kit || '#e53935');
  const two = keeper ? (team.keeperColor2 || one) : (team.playerColor2 || one);
  const three = keeper ? (team.keeperColor3 || '#111') : (team.playerColor3 || '#111');
  const style = keeper ? (team.keeperShirtStyle || 'solid') : (team.playerShirtStyle || 'solid');
  const left = x - 32 * scale, top = y - 36 * scale, width = 64 * scale, height = 72 * scale;
  context.save();
  context.beginPath();
  context.moveTo(left + width * .21, top);
  context.lineTo(left + width * .39, top + height * .1);
  context.lineTo(left + width * .61, top + height * .1);
  context.lineTo(left + width * .79, top);
  context.lineTo(left + width, top + height * .2);
  context.lineTo(left + width * .82, top + height * .43);
  context.lineTo(left + width * .75, top + height * .34);
  context.lineTo(left + width * .75, top + height);
  context.lineTo(left + width * .25, top + height);
  context.lineTo(left + width * .25, top + height * .34);
  context.lineTo(left + width * .18, top + height * .43);
  context.lineTo(left, top + height * .2);
  context.closePath();
  context.clip();
  context.fillStyle = one;
  context.fillRect(left, top, width, height);
  context.fillStyle = two;
  if (style === 'band') context.fillRect(left, top + height * .32, width, height * .23);
  else if (style === 'center') context.fillRect(left + width * .36, top, width * .28, height);
  else if (style === 'half') context.fillRect(left, top + height * .52, width, height * .48);
  else if (style === 'split') context.fillRect(left + width / 2, top, width / 2, height);
  else if (style === 'thirds') { context.fillRect(left + width / 3, top, width / 3, height); context.fillStyle = three; context.fillRect(left + width * 2 / 3, top, width / 3, height); }
  else if (style === 'sleeves') { context.fillRect(left, top, width * .22, height); context.fillRect(left + width * .78, top, width * .22, height); }
  else if (style === 'vertical' || style === 'wide' || style === 'pinstripe') {
    const stripe = (style === 'wide' ? 16 : style === 'pinstripe' ? 4 : 12) * scale;
    for (let stripeX = left, index = 0; stripeX < left + width; stripeX += stripe, index++) { context.fillStyle = [one, two, three][index % 3]; context.fillRect(stripeX, top, stripe + .5, height); }
  } else if (style === 'hoops' || style === 'thin-hoops') {
    const stripe = (style === 'thin-hoops' ? 7 : 14) * scale;
    for (let stripeY = top, index = 0; stripeY < top + height; stripeY += stripe, index++) { context.fillStyle = [one, two, three][index % 3]; context.fillRect(left, stripeY, width, stripe + .5); }
  } else if (style === 'diagonal' || style === 'sash') {
    context.save(); context.translate(x, y); context.rotate(-Math.PI / 4);
    const stripeWidth = (style === 'sash' ? 12 : 8) * scale;
    for (let stripeX = -80 * scale; stripeX < 80 * scale; stripeX += stripeWidth * 2) context.fillRect(stripeX, -80 * scale, stripeWidth, 160 * scale);
    context.restore();
  } else if (style === 'cross') {
    context.fillRect(left + width * .42, top, width * .16, height);
    context.fillRect(left, top + height * .38, width, height * .17);
  } else if (style === 'double-band') {
    context.fillRect(left, top + height * .22, width, height * .12); context.fillRect(left, top + height * .58, width, height * .12);
  } else if (style === 'frame') {
    context.fillRect(left, top, width * .13, height); context.fillRect(left + width * .87, top, width * .13, height); context.fillRect(left, top, width, height * .13); context.fillRect(left, top + height * .87, width, height * .13);
  } else if (style === 'offset') {
    context.save(); context.translate(x, y); context.rotate(-Math.PI / 7); context.fillRect(-8 * scale, -80 * scale, 16 * scale, 160 * scale); context.restore();
  } else if (style === 'blocks') {
    context.fillRect(left, top, width / 3, height / 2); context.fillRect(left + width * 2 / 3, top, width / 3, height / 2); context.fillStyle = three; context.fillRect(left + width / 3, top + height / 2, width / 3, height / 2);
  } else if (style === 'left') context.fillRect(left, top, width * .3, height);
  else if (style === 'right') context.fillRect(left + width * .7, top, width * .3, height);
  else if (style === 'chevron' || style === 'vneck' || style === 'collar') {
    context.strokeStyle = two; context.lineWidth = (style === 'chevron' ? 9 : 6) * scale; context.beginPath(); context.moveTo(left + width * .22, top + height * .18); context.lineTo(x, top + height * .4); context.lineTo(left + width * .78, top + height * .18); context.stroke();
  } else if (style === 'gradient' || style === 'fade') {
    const gradient = context.createLinearGradient(left, top, left, top + height); gradient.addColorStop(0, two); gradient.addColorStop(1, one); context.fillStyle = gradient; context.fillRect(left, top, width, height);
  } else if (style === 'checker') {
    for (let row = 0; row < 5; row++) for (let column = 0; column < 5; column++) if ((row + column) % 2) context.fillRect(left + column * 11 * scale, top + row * 12 * scale, 11 * scale, 12 * scale);
  } else if (style === 'dots') {
    context.fillStyle = three;
    for (let dotY = top + 6 * scale; dotY < top + height; dotY += 12 * scale) for (let dotX = left + 6 * scale; dotX < left + width; dotX += 12 * scale) { context.beginPath(); context.arc(dotX, dotY, 2 * scale, 0, Math.PI * 2); context.fill(); }
  } else if (style === 'shoulders') {
    context.fillStyle = two; context.beginPath(); context.moveTo(left, top); context.lineTo(left + width * .38, top); context.lineTo(left + width * .2, top + height * .25); context.lineTo(left, top + height * .2); context.fill(); context.beginPath(); context.moveTo(left + width, top); context.lineTo(left + width * .62, top); context.lineTo(left + width * .8, top + height * .25); context.lineTo(left + width, top + height * .2); context.fill();
  } else if (style === 'zigzag') {
    context.strokeStyle = two; context.lineWidth = 5 * scale; for (let y = top + 12 * scale; y < top + height; y += 16 * scale) { context.beginPath(); context.moveTo(left, y); for (let x = left; x < left + width; x += 12 * scale) context.lineTo(x + 6 * scale, y - 5 * scale), context.lineTo(x + 12 * scale, y); context.stroke(); }
  } else if (style === 'stars') {
    context.fillStyle = three; for (let py = top + 10 * scale; py < top + height; py += 18 * scale) for (let px = left + 10 * scale; px < left + width; px += 18 * scale) { context.beginPath(); context.arc(px, py, 3 * scale, 0, Math.PI * 2); context.fill(); }
  } else if (style === 'grid') {
    context.strokeStyle = two; context.lineWidth = 1.5 * scale; for (let px = left; px <= left + width; px += 10 * scale) { context.beginPath(); context.moveTo(px, top); context.lineTo(px, top + height); context.stroke(); } for (let py = top; py <= top + height; py += 10 * scale) { context.beginPath(); context.moveTo(left, py); context.lineTo(left + width, py); context.stroke(); }
  } else if (style === 'rays') {
    context.strokeStyle = two; context.lineWidth = 5 * scale; for (let px = left - width; px < left + width * 2; px += 12 * scale) { context.beginPath(); context.moveTo(x, top); context.lineTo(px, top + height); context.stroke(); }
  }
  context.restore();
  context.save();
  context.strokeStyle = 'rgba(0,0,0,.28)';
  context.lineWidth = 1.2 * scale;
  context.stroke();
  context.beginPath();
  context.arc(x, top + height * .14, 6 * scale, 0, Math.PI);
  context.stroke();
  context.restore();
  return { numberColor: keeper ? (team.keeperNumberColor || '#111') : (team.playerNumberColor || '#fff') };
}

function selectedCompetitionName() {
  const title = document.querySelector('.competition-title');
  const selected = title?.dataset.selectedCompetition || title?.querySelector('summary')?.textContent?.trim() || '';
  return selected && selected.toLowerCase() !== 'competizione' ? selected : '';
}

function selectedCompetitionLogo() {
  const selected = selectedCompetitionName();
  if (embeddedCompetitionIcons[selected]) return embeddedCompetitionIcons[selected];
  const title = document.querySelector('.competition-title');
  const raw = title?.style.getPropertyValue('--competition-icon') || '';
  const source = raw.match(/url\(["']?(.*?)["']?\)/)?.[1];
  if (source) return source;
  return '';
}

function imageFromPdfSource(source) {
  return new Promise(resolve => {
    if (!source) return resolve(null);
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

async function loadPdfImage(source) {
  if (!source) return null;
  if (source.startsWith('data:')) return imageFromPdfSource(source);
  try {
    const response = await fetch(source);
    const blob = await response.blob();
    if (!blob.size) return null;
    const data = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
    return imageFromPdfSource(data);
  } catch {
    return null;
  }
}

function createPdfCanvas(competitionLogo, homeLogo, awayLogo, refereeLogo, assistantLogo) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = 1800;
  const height = canvas.height = 3600;
  const tableLogoSize = 36;
  const field = { x: 390, y: 270, width: 1020, height: 663 };
  const chartTeamColors = () => ({ home: teams.home.playerColor1 || teams.home.kit || '#ef4444', away: teams.away.playerColor1 || teams.away.kit || '#2563eb' });
  const isWhiteTeamColor = color => ['#fff', '#ffffff', 'white', 'rgb(255,255,255)', 'rgb(255, 255, 255)'].includes(String(color || '').trim().toLowerCase());
  const drawTeamValue = (value, x, y, color, maxWidth) => {
    context.save();
    if (isWhiteTeamColor(color)) { context.strokeStyle = '#111'; context.lineWidth = 2; context.strokeText(String(value), x, y, maxWidth); }
    context.fillStyle = color; context.fillText(String(value), x, y, maxWidth); context.restore();
  };
  const text = selector => document.querySelector(selector)?.textContent?.trim() || '';
  const lineup = document.body.dataset.lineup || 'both';
  const visibleSide = side => lineup === 'both' || lineup === side;
  const visibleSides = ['home', 'away'].filter(visibleSide);
  const fieldPosition = (side, index) => {
    const point = positions[side][index] || [50, 50];
    if (lineup !== side) return point;
    const xs = (teams[side].players || []).map((_, playerIndex) => (positions[side][playerIndex] || [50, 50])[0]);
    const min = Math.min(...xs), max = Math.max(...xs), span = max - min || 1;
    return [8 + (point[0] - min) / span * 84, point[1]];
  };
  // Le selezioni vengono usate sia nei titolari sia nei giocatori entrati nel campo esportato.
  const rosterFlags = player => ['C', 'VC'].filter(flag => player?._listFlags?.[flag]).join(', ');
  const rosterName = player => {
    const parts = String(player[1] || '').trim().split(/\s+/).filter(Boolean);
    const surname = parts.pop() || '';
    const name = [surname, ...parts].filter(Boolean).join(' ');
    const flags = rosterFlags(player);
    const year = String(player?._underDetail || '').replace(/\D/g, '').slice(0, 2);
    const underYear = player?._listFlags?.U && year ? ` (${year})` : '';
    return `${flags ? `${name} (${flags})` : name}${underYear}`;
  };
  const fieldName = player => {
    const parts = String(player[1] || '').trim().split(/\s+/).filter(Boolean);
    const surname = parts.pop() || '';
    const firstName = parts[0] || surname;
    const flags = rosterFlags(player);
    const name = surname ? `${firstName.charAt(0)}. ${surname}` : '';
    return flags ? `${name} (${flags})` : name;
  };
  const drawUnderYearBadge = (player, centerX, baseline, textWidth) => {
    const year = player?._listFlags?.U ? String(player?._underDetail || '').replace(/\D/g, '').slice(0, 2) : '';
    if (!year) return;
    context.save(); context.font = 'bold 10px Arial';
    const width = context.measureText(year).width + 8, x = centerX + textWidth / 2 + 4, y = baseline - 12;
    context.fillStyle = '#dc2626'; context.fillRect(x, y, width, 14);
    context.fillStyle = '#fff'; context.textAlign = 'center'; context.fillText(year, x + width / 2, baseline - 2);
    context.restore();
  };
  const visibleMinute = (side, key, icon = '') => {
    const team = teams[side];
    const all = [...(team.players || []), ...(team.bench || [])];
    const index = all.findIndex(player => `${player[0]} ${player[1]}` === key);
    if (index < 0) return '';
    const rows = document.querySelectorAll(`#${side}Panel .player-list .player-row, #${side}Panel .bench-list .player-row`);
    const row = rows[index];
    if (!row) return '';
    const entry = [...row.querySelectorAll('.player-event-entry')].find(item => item.querySelector('b')?.textContent.trim() === icon || item.textContent.includes(icon));
    const value = entry?.querySelector('small')?.textContent || row.querySelector('.swap-marker,.player-minute,.player-event-minute,.visible-minute-label,.event-minute-manual')?.textContent || '';
    return value.match(/\d+(?:\+\d+)?/)?.[0] || '';
  };
  const eventSummary = (side, team, player) => {
    const key = `${player[0]} ${player[1]}`;
    const events = [...(team.eventLog || []), ...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || []), ...(team._cardEvents || [])];
    const values = [];
    const add = (symbol, minute = '', color = '#fff') => {
      const existing = values.find(value => value.symbol === symbol && value.color === color && String(value.minute) === String(minute || ''));
      if (existing) {
        if (!existing.minute && minute) existing.minute = String(minute);
        return;
      }
      values.push({ symbol, minute: String(minute || ''), color });
    };
    events.forEach(event => {
      const change = event.type === 'swap' || event.label === 'Cambio' || event.icon === '⇄';
      if (change) {
        const [outgoing = '', incoming = ''] = String(event.player || '').split('→').map(value => value.trim());
        if (event.outgoing === key || outgoing === key) add('→', event.minute || visibleMinute(side, key, '➜'), '#ef4444');
        if (event.incoming === key || incoming === key) add('←', event.minute || visibleMinute(side, key, '⬅'), '#15803d');
      } else if ((event.label === 'Esce' || event.icon === '➜' || event.icon === '→') && event.player === key) {
        add('→', event.minute || visibleMinute(side, key, event.icon), '#ef4444');
      } else if ((event.label === 'Entra' || event.icon === '⬅' || event.icon === '←') && event.player === key) {
        add('←', event.minute || visibleMinute(side, key, event.icon), '#15803d');
      } else if (event.player === key && event.icon) add(event.icon, event.minute || visibleMinute(side, key, event.icon));
    });
    // Usa anche le registrazioni per minuto: così due ammonizioni dello
    // stesso giocatore rimangono entrambe nell'elenco esportato.
    (player._visibleEventMinutes || []).forEach(event => {
      if (event?.icon) add(event.icon, event.minute || '');
    });
    const enters = events.some(event => {
      if (event.label === 'Entra' && event.player === key) return true;
      if (!(event.type === 'swap' || event.label === 'Cambio' || event.icon === '⇄')) return false;
      const [, incoming = ''] = String(event.player || '').split('→').map(value => value.trim());
      return event.incoming === key || incoming === key;
    });
    return enters ? values.filter(value => value.color !== '#ef4444') : values;
  };
  const drawEventSummary = (items, x, y) => {
    let cursor = x;
    context.font = 'bold 14px Arial';
    items.forEach(item => {
      context.fillStyle = item.color;
      context.fillText(item.symbol, cursor, y);
      cursor += context.measureText(item.symbol).width + 2;
      if (item.minute) {
        const minute = `${item.minute}'`;
        context.fillStyle = '#fff';
        context.fillText(minute, cursor, y);
        cursor += context.measureText(minute).width + 5;
      }
    });
  };
  const drawFieldEvents = (items, x, y, horizontal = false) => {
    items.forEach((item, index) => {
      const offset = index * (horizontal ? 20 : 15);
      const drawX = horizontal ? x + offset : x;
      const drawY = horizontal ? y : y + offset;
      const arrow = item.symbol === '→' || item.symbol === '←';
      context.textAlign = 'left';
      context.font = arrow ? 'bold 20px Arial' : '15px Arial';
      if (arrow) {
        context.strokeStyle = '#fff';
        context.lineWidth = 2.5;
        context.strokeText(item.symbol, drawX, drawY);
      }
      context.fillStyle = item.color;
      context.fillText(item.symbol, drawX, drawY);
    });
  };
  const fieldSubstitute = (side, team, player) => {
    const key = `${player[0]} ${player[1]}`;
    const changes = [...(team.eventLog || []), ...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || [])];
    for (const change of changes) {
      if (!(change.type === 'swap' || change.label === 'Cambio' || change.icon === '⇄')) continue;
      const [outgoing = '', incoming = ''] = String(change.player || '').split('→').map(value => value.trim());
      if (change.outgoing !== key && outgoing !== key) continue;
      const incomingKey = change.incoming || incoming;
      return [...(team.players || []), ...(team.bench || [])].find(item => `${item[0]} ${item[1]}` === incomingKey) || null;
    }
    return null;
  };
  const eventMinute = (event, side) => {
    const direct = event?.minute ?? event?.minuto ?? event?.time ?? event?._minute;
    if (direct !== '' && direct !== null && direct !== undefined) return String(direct);
    const team = teams[side];
    const allPlayers = [...(team?.players || []), ...(team?.bench || [])];
    const storedMinute = (name, icons) => {
      const player = allPlayers.find(item => `${item[0]} ${item[1]}` === name);
      const record = [...(player?._visibleEventMinutes || [])].reverse().find(item => icons.includes(item.icon));
      if (record?.minute) return String(record.minute);
      const index = allPlayers.indexOf(player);
      const row = index < 0 ? null : document.querySelectorAll(`#${side}Panel .player-list .player-row, #${side}Panel .bench-list .player-row`)[index];
      const minuteText = [...(row?.querySelectorAll('.player-event-entry small,.player-minute,.player-event-minute,.visible-minute-label') || [])].map(item => item.textContent).join(' ');
      return (minuteText.match(/(\d+)'/) || [])[1] || '';
    };
    if (event?.type === 'swap' || event?.label === 'Cambio') {
      const details = changeDetails(event);
      const noteMinute = (document.querySelector('#swapNote')?.textContent.match(/(\d+)'/) || [])[1] || '';
      return storedMinute(details.outgoing, ['➜', '⬅']) || storedMinute(details.incoming, ['➜', '⬅']) || noteMinute;
    }
    return storedMinute(event?.player, [event?.icon || (event?.label === 'Gol' ? '⚽' : event?.label === 'Assist' ? '👟' : event?.label === 'Ammonito' ? '🟨' : '🟥')]);
  };
  const changeDetails = event => {
    if (event?.outgoing || event?.incoming) return { outgoing: event.outgoing || '', incoming: event.incoming || '' };
    const parts = String(event?.player || '').split(/\s*(?:→|â†’)\s*/);
    return parts.length === 2 ? { outgoing: parts[0].trim(), incoming: parts[1].trim() } : { outgoing: '', incoming: '' };
  };
  const tableData = side => {
    const team = teams[side];
    const recordedCards = [...(team.players || []), ...(team.bench || [])].flatMap(player =>
      (player._visibleEventMinutes || [])
        .filter(item => item.icon === '🟨' || item.icon === '🟥')
        .map(item => ({ icon: item.icon, label: item.icon === '🟨' ? 'Ammonito' : 'Espulso', player: `${player[0]} ${player[1]}`, minute: item.minute || '' }))
    );
    const source = [...(team.eventLog || []), ...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || []), ...(team._cardEvents || []), ...recordedCards];
    const unique = [];
    source.forEach(event => {
      const change = event.type === 'swap' || event.label === 'Cambio';
      const details = changeDetails(event);
      const key = change
        ? `cambio|${details.outgoing}|${details.incoming}|${eventMinute(event, side)}`
        : `${event.label || ''}|${event.player || ''}|${eventMinute(event, side)}`;
      if (!unique.some(item => item.key === key)) unique.push({ key, ...event, details });
    });
    const order = (a, b) => (Number(eventMinute(a, side) || 999) - Number(eventMinute(b, side) || 999));
    const assists = unique.filter(event => event.label === 'Assist');
    const usedAssists = new Set();
    const goals = unique.filter(event => event.label === 'Gol').sort(order).map(goal => {
      let assistIndex = assists.findIndex((event, index) => !usedAssists.has(index) && String(eventMinute(event, side)) === String(eventMinute(goal, side)));
      if (assistIndex < 0) assistIndex = assists.findIndex((event, index) => !usedAssists.has(index) && Number(event.order || 0) >= Number(goal.order || 0));
      if (assistIndex < 0) assistIndex = assists.findIndex((event, index) => !usedAssists.has(index));
      if (assistIndex >= 0) usedAssists.add(assistIndex);
      const assist = goal.assist || (assistIndex >= 0 ? assists[assistIndex].player : '') || '';
      return [eventMinute(goal, side), goal.player || '', assist];
    });
    const simple = label => unique.filter(event => event.label === label).sort(order).map(event => [eventMinute(event, side), event.player || '', event.reason || '']);
    const changes = unique.filter(event => event.type === 'swap' || event.label === 'Cambio').sort(order).map(event => [eventMinute(event, side), event.details.outgoing, event.details.incoming]);
    return [
      { title: '⚽ 👟 GOL E ASSIST', headers: ['MIN.', 'GOL', 'ASSIST'], rows: goals },
      { title: '🟨 CARTELLINI GIALLI', headers: ['MIN.', 'AMMONITO', 'MOTIVO'], rows: simple('Ammonito') },
      { title: '🟥 CARTELLINI ROSSI', headers: ['MIN.', 'ESPULSO', 'MOTIVO'], rows: simple('Espulso') },
      { title: '⇄ CAMBI', headers: ['MIN.', 'ESCE', 'ENTRA'], rows: changes }
    ];
  };
  const short = value => {
    const output = String(value || '');
    return output.length > 27 ? `${output.slice(0, 26)}…` : output;
  };
  const drawPdfTables = (side, x, y, tableWidth, logo, sharedRowCounts = []) => {
    if (logo?.naturalWidth) {
      const size = tableLogoSize;
      const ratio = logo.naturalWidth / logo.naturalHeight;
      const logoWidth = ratio >= 1 ? size : size * ratio;
      const logoHeight = ratio >= 1 ? size / ratio : size;
      context.drawImage(logo, x + tableWidth / 2 - logoWidth / 2, y - 84, logoWidth, logoHeight);
    }
    let cursorY = y + 13;
    tableData(side).forEach((section, sectionIndex) => {
      const rows = section.rows.length ? section.rows : [[]];
      while (rows.length < Math.max(1, sharedRowCounts[sectionIndex] || 1)) rows.push([]);
      const rowHeight = 30;
      context.fillStyle = '#17394c'; context.fillRect(x, cursorY, tableWidth, 30);
      context.textAlign = 'left'; context.font = 'bold 15px Arial'; context.fillStyle = '#fff';
      context.fillText(section.title, x + 10, cursorY + 20);
      cursorY += 30;
      context.fillStyle = '#dce7ec'; context.fillRect(x, cursorY, tableWidth, 25);
      const columns = section.headers.length;
      const minWidth = 64;
      const columnWidth = (tableWidth - minWidth) / (columns - 1 || 1);
      context.font = 'bold 12px Arial'; context.fillStyle = '#17394c';
      section.headers.forEach((header, index) => context.fillText(header, x + (index === 0 ? 9 : minWidth + (index - 1) * columnWidth + 9), cursorY + 17));
      cursorY += 25;
      rows.forEach(row => {
        context.fillStyle = '#fff'; context.fillRect(x, cursorY, tableWidth, rowHeight);
        context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(x, cursorY, tableWidth, rowHeight);
        context.font = '14px Arial'; context.fillStyle = '#111'; context.textAlign = 'left';
        row.forEach((value, index) => {
          const label = index === 0 && value ? `${value}'` : short(value);
          const cellX = x + (index === 0 ? 9 : minWidth + (index - 1) * columnWidth + 9);
          context.fillText(label, cellX, cursorY + 20, index === 0 ? minWidth - 12 : columnWidth - 12);
        });
        cursorY += rowHeight;
      });
      cursorY += 9;
    });
    return cursorY;
  };
  const drawOfficialIcon = (kind, x, y) => {
    context.save();
    if (kind === 'referee') {
      context.fillStyle = '#f5a623'; context.strokeStyle = '#9c5a00'; context.lineWidth = 1.5;
      context.beginPath(); context.arc(x + 12, y + 10, 7, 0, Math.PI * 2); context.fill(); context.stroke();
      context.fillRect(x + 1, y + 4, 13, 7); context.strokeRect(x + 1, y + 4, 13, 7);
      context.strokeStyle = '#111'; context.lineWidth = 2; context.beginPath(); context.moveTo(x + 5, y + 6); context.lineTo(x + 9, y + 10); context.stroke();
    } else {
      context.strokeStyle = '#555'; context.lineWidth = 1.6;
      context.beginPath(); context.moveTo(x + 5, y + 2); context.lineTo(x + 10, y + 18); context.moveTo(x + 15, y + 2); context.lineTo(x + 10, y + 18); context.stroke();
      context.fillStyle = '#f5dd32'; context.fillRect(x + 2, y + 2, 7, 7); context.fillRect(x + 12, y + 2, 7, 7);
      context.fillStyle = '#e53235'; context.fillRect(x + 2, y + 9, 7, 7); context.fillRect(x + 12, y + 9, 7, 7);
    }
    context.restore();
  };
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  const competitionName = selectedCompetitionName() || 'Competizione';
  const season = text('.season-menu summary') || '2026/2027';
  const competition = `${competitionName}  ·  STAGIONE SPORTIVA ${season}`;
  context.fillStyle = '#111';
  context.textAlign = 'center';
  context.font = 'bold 30px Arial';
  context.fillText(competition, 900, 48);
  if (competitionLogo?.naturalWidth) {
    const size = 62;
    const ratio = competitionLogo.naturalWidth / competitionLogo.naturalHeight;
    const logoWidth = ratio >= 1 ? size : size * ratio;
    const logoHeight = ratio >= 1 ? size / ratio : size;
    context.drawImage(competitionLogo, 900 - context.measureText(competition).width / 2 - logoWidth - 15, 39 - logoHeight / 2, logoWidth, logoHeight);
  }
  context.font = 'bold 18px Arial';
  const matchDay = text('.match-day');
  const matchDate = text('.match-date');
  context.fillText(`${matchDay}     ${matchDate}`.trim(), 900, 80);
  context.fillText(document.querySelector('#venueField')?.textContent.trim() || '', 900, 105);
  const officials = [...document.querySelectorAll('.official-detail')].map(item => item.textContent.trim());
  const iconSize = 20;
  const gap = 26;
  const officialWidths = officials.map(item => context.measureText(item).width + iconSize + 6);
  let officialX = 900 - (officialWidths.reduce((sum, value) => sum + value, 0) + gap * Math.max(officials.length - 1, 0)) / 2;
  officials.forEach((official, index) => {
    drawOfficialIcon(index === 0 ? 'referee' : 'assistant', officialX, 113);
    context.textAlign = 'left';
    context.fillText(official, officialX + iconSize + 6, 130);
    officialX += officialWidths[index] + gap;
  });
  context.textAlign = 'center';
  context.font = 'bold 62px Arial';
  const scoreText = lineup === 'home' ? (text('#homeScore') || '0') : lineup === 'away' ? (text('#awayScore') || '0') : `${text('#homeScore') || '0'} - ${text('#awayScore') || '0'}`;
  context.fillText(scoreText, 900, 215);
  context.font = 'bold 32px Arial';
  if (visibleSide('home')) {
    context.textAlign = 'left';
    context.fillText(teams.home.name, 435, 215);
  }
  if (visibleSide('away')) {
    context.textAlign = 'right';
    context.fillText(teams.away.name, 1365, 215);
  }
  context.textAlign = 'center';
  for (const [side, logo, center] of [['home', homeLogo, 370], ['away', awayLogo, 1430]]) {
    if (!visibleSide(side)) continue;
    if (!logo?.naturalWidth) continue;
    const size = 100;
    const ratio = logo.naturalWidth / logo.naturalHeight;
    const logoWidth = ratio >= 1 ? size : size * ratio;
    const logoHeight = ratio >= 1 ? size / ratio : size;
    context.drawImage(logo, center - logoWidth / 2, 206 - logoHeight / 2, logoWidth, logoHeight);
  }
  context.fillStyle = '#249b57';
  context.fillRect(field.x, field.y, field.width, field.height);
  context.strokeStyle = '#fff';
  context.lineWidth = 4;
  context.strokeRect(field.x, field.y, field.width, field.height);
  context.lineWidth = 3;
  context.beginPath(); context.moveTo(900, field.y); context.lineTo(900, field.y + field.height); context.stroke();
  context.beginPath(); context.arc(900, field.y + field.height / 2, 84, 0, Math.PI * 2); context.stroke();
  const pitchX = value => field.x + value / 1000 * field.width;
  const pitchY = value => field.y + value / 650 * field.height;
  const pitchW = value => value / 1000 * field.width;
  const pitchH = value => value / 650 * field.height;
  const middleY = field.y + field.height / 2;
  context.lineWidth = 3;
  context.strokeRect(pitchX(4), pitchY(145), pitchW(145), pitchH(360));
  context.strokeRect(pitchX(4), pitchY(220), pitchW(55), pitchH(210));
  context.strokeRect(pitchX(851), pitchY(145), pitchW(145), pitchH(360));
  context.strokeRect(pitchX(941), pitchY(220), pitchW(55), pitchH(210));
  context.fillStyle = '#fff';
  [[105, 325], [895, 325]].forEach(([x, y]) => {
    context.beginPath(); context.arc(pitchX(x), pitchY(y), 5, 0, Math.PI * 2); context.fill();
  });
  context.strokeStyle = '#fff';
  context.beginPath();
  context.ellipse(pitchX(105), middleY, pitchW(85), pitchH(85), 0, -0.78, 0.78);
  context.stroke();
  context.beginPath();
  context.ellipse(pitchX(895), middleY, pitchW(85), pitchH(85), 0, Math.PI - 0.78, Math.PI + 0.78);
  context.stroke();
  const cornerRadius = pitchW(31);
  [[field.x, field.y, 0], [field.x + field.width, field.y, Math.PI / 2], [field.x + field.width, field.y + field.height, Math.PI], [field.x, field.y + field.height, Math.PI * 1.5]].forEach(([x, y, start]) => {
    context.beginPath(); context.arc(x, y, cornerRadius, start, start + Math.PI / 2); context.stroke();
  });
  const fieldNumbers = [];
  for (const side of visibleSides) {
    const team = teams[side];
    (team.players || []).forEach((player, index) => {
      const position = fieldPosition(side, index);
      const x = field.x + position[0] / 100 * field.width;
      const y = field.y + position[1] / 100 * field.height;
      const shirt = drawPdfShirt(context, x, y, team, player);
      fieldNumbers.push({ value: player[0], x, y, color: shirt.numberColor, side, team, player });
      context.textAlign = 'center'; context.fillStyle = '#111'; context.font = 'bold 16px Arial';
      const playerFieldLabel = fieldName(player); context.fillText(playerFieldLabel, x, y + 51); drawUnderYearBadge(player, x, y + 51, context.measureText(playerFieldLabel).width);
      drawFieldEvents(eventSummary(side, team, player), x + 30, y - 18);
      const incoming = fieldSubstitute(side, team, player);
      if (incoming) {
        context.textAlign = 'center'; context.font = 'bold 11px Arial'; context.fillStyle = '#111';
        const incomingFieldLabel = `(${fieldName(incoming)})`; context.fillText(incomingFieldLabel, x, y + 70); drawUnderYearBadge(incoming, x, y + 70, context.measureText(incomingFieldLabel).width);
        drawFieldEvents(eventSummary(side, team, incoming).filter(item => item.symbol !== '→' && item.symbol !== '←'), x - 10, y + 90, true);
      }
    });
    const left = side === 'home' ? 25 : 1435;
    const listWidth = 340;
    context.textAlign = 'left'; context.fillStyle = '#111'; context.font = 'bold 16px Arial';
    context.fillText('TITOLARI', left, 290);
    (team.players || []).forEach((player, index) => {
      const y = 302 + index * 33;
      context.fillStyle = '#17394c'; context.fillRect(left, y, listWidth, 30);
      const starterShirt = drawPdfShirt(context, left + 22, y + 15, team, player, .42);
      context.textAlign = 'center'; context.fillStyle = starterShirt.numberColor; context.font = 'bold 15px Arial'; context.fillText(player[0], left + 22, y + 20);
      context.textAlign = 'left'; context.fillStyle = '#fff'; context.font = 'bold 15px Arial'; context.fillText(rosterName(player), left + 50, y + 20, 155);
      drawEventSummary(eventSummary(side, team, player), left + 215, y + 21);
    });
    context.fillStyle = '#111'; context.font = 'bold 16px Arial'; context.fillText('A DISPOSIZIONE', left, 690);
    (team.bench || []).forEach((player, index) => {
      const y = 702 + index * 33;
      context.fillStyle = '#17394c'; context.fillRect(left, y, listWidth, 30);
      const benchShirt = drawPdfShirt(context, left + 22, y + 15, team, player, .42);
      context.textAlign = 'center'; context.fillStyle = benchShirt.numberColor; context.font = 'bold 15px Arial'; context.fillText(player[0], left + 22, y + 20);
      context.textAlign = 'left'; context.fillStyle = '#fff'; context.font = 'bold 15px Arial'; context.fillText(rosterName(player), left + 50, y + 20, 155);
      drawEventSummary(eventSummary(side, team, player), left + 215, y + 21);
    });
    const coachY = 790 + (team.bench || []).length * 33;
    context.textAlign = 'left'; context.fillStyle = '#111'; context.font = 'bold 11px Arial';
    context.fillText('C = Capitano · VC = Vice Capitano · U = Under', left + 2, coachY - 31, listWidth - 4);
    context.fillStyle = '#0a2435'; context.fillRect(left, coachY - 24, listWidth, 30);
    context.fillStyle = '#fff'; context.font = 'bold 20px Arial';
    context.fillText(`Allenatore: ${team.coach || ''}`, left + 10, coachY - 3);
  }
  context.save();
  context.strokeStyle = '#fff'; context.fillStyle = '#fff'; context.lineWidth = 3;
  context.strokeRect(field.x, field.y, field.width, field.height);
  context.beginPath(); context.moveTo(900, field.y); context.lineTo(900, field.y + field.height); context.stroke();
  context.beginPath(); context.arc(900, field.y + field.height / 2, 84, 0, Math.PI * 2); context.stroke();
  context.strokeRect(pitchX(4), pitchY(145), pitchW(145), pitchH(360));
  context.strokeRect(pitchX(4), pitchY(220), pitchW(55), pitchH(210));
  context.strokeRect(pitchX(851), pitchY(145), pitchW(145), pitchH(360));
  context.strokeRect(pitchX(941), pitchY(220), pitchW(55), pitchH(210));
  [[105, 325], [895, 325]].forEach(([x, y]) => { context.beginPath(); context.arc(pitchX(x), pitchY(y), 5, 0, Math.PI * 2); context.fill(); });
  context.beginPath(); context.ellipse(pitchX(105), middleY, pitchW(85), pitchH(85), 0, -0.78, 0.78); context.stroke();
  context.beginPath(); context.ellipse(pitchX(895), middleY, pitchW(85), pitchH(85), 0, Math.PI - 0.78, Math.PI + 0.78); context.stroke();
  [[field.x, field.y, 0], [field.x + field.width, field.y, Math.PI / 2], [field.x + field.width, field.y + field.height, Math.PI], [field.x, field.y + field.height, Math.PI * 1.5]].forEach(([x, y, start]) => { context.beginPath(); context.arc(x, y, cornerRadius, start, start + Math.PI / 2); context.stroke(); });
  context.restore();
  fieldNumbers.forEach(number => {
    const shirt = drawPdfShirt(context, number.x, number.y, number.team, number.player);
    context.textAlign = 'center'; context.font = 'bold 25px Arial'; context.fillStyle = shirt.numberColor;
    context.fillText(number.value, number.x, number.y + 8);
    context.fillStyle = '#111'; context.font = 'bold 16px Arial'; const numberFieldLabel = fieldName(number.player); context.fillText(numberFieldLabel, number.x, number.y + 51); drawUnderYearBadge(number.player, number.x, number.y + 51, context.measureText(numberFieldLabel).width);
    drawFieldEvents(eventSummary(number.side, number.team, number.player), number.x + 30, number.y - 18);
    const incoming = fieldSubstitute(number.side, number.team, number.player);
    if (incoming) {
      context.textAlign = 'center'; context.font = 'bold 11px Arial'; context.fillStyle = '#111';
      const incomingNumberLabel = `(${fieldName(incoming)})`; context.fillText(incomingNumberLabel, number.x, number.y + 70); drawUnderYearBadge(incoming, number.x, number.y + 70, context.measureText(incomingNumberLabel).width);
      drawFieldEvents(eventSummary(number.side, number.team, incoming).filter(item => item.symbol !== 'â†’' && item.symbol !== 'â†'), number.x - 10, number.y + 90, true);
    }
  });
  context.textAlign = 'center'; context.fillStyle = '#111'; context.font = 'bold 24px Arial';
  if (visibleSide('home')) context.fillText(`FORMAZIONE ${teams.home.formation || '4-3-3'}`, 650, 970);
  if (visibleSide('away')) context.fillText(`FORMAZIONE ${teams.away.formation || '4-3-3'}`, 1150, 970);
  const sharedPdfEventRows = [0, 1, 2, 3].map(index => Math.max(1, ...visibleSides.map(side => tableData(side)[index]?.rows.length || 0)));
  const homeTablesBottom = visibleSide('home') ? drawPdfTables('home', lineup === 'home' ? 652 : 390, 1085, 495, homeLogo, sharedPdfEventRows) : 0;
  const awayTablesBottom = visibleSide('away') ? drawPdfTables('away', lineup === 'away' ? 652 : 915, 1085, 495, awayLogo, sharedPdfEventRows) : 0;
  const legendY = Math.max(homeTablesBottom, awayTablesBottom) + 20;
  canvas.simplePdfHeight = legendY + 12;
  context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = '#17394c';
  context.fillText('LEGENDA CARTELLINI:  F: Fallo  ·  FM: Fallo Mano  ·  P: Proteste  ·  AS: Anti Sportivo  ·  R: Reazione  ·  DG: Doppio Giallo', 900, legendY);
  const shotRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#shotStatsTable tr[data-side="${side}"]`);
    const values = [...(row?.querySelectorAll('input') || [])].map(input => Number(input.value) || 0);
    const total = values[0] || 0;
    const successful = values[1] || 0;
    return [teams[side].name, total, successful, `${total ? Math.round(successful / total * 100) : 0}%`];
  });
  // Le righe si dispongono in base all'altezza della tabella più alta, evitando sovrapposizioni.
  const topStatsY = legendY + 28, topStatsHeight = 238, statsGap = 20;
  const statsX = 610, statsY = topStatsY + topStatsHeight + statsGap, statsWidth = 520, columnWidth = 260;
  context.fillStyle = '#17394c'; context.fillRect(statsX, statsY, statsWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff';
  context.fillText('STATISTICHE TIRI', statsX + statsWidth / 2, statsY + 19);
  shotRows.forEach((row, index) => {
    const x = statsX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, statsY + 28, columnWidth, 158);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, statsY + 28, columnWidth, 158);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) {
      const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize;
      const width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size;
      context.drawImage(logo, x + columnWidth / 2 - width / 2, statsY + 36, width, height);
    } else {
      context.font = 'bold 12px Arial'; context.fillStyle = '#17394c'; context.fillText(row[0], x + columnWidth / 2, statsY + 66);
    }
    const values = [['Tiri totali', row[1]], ['Tiri riusciti', row[2]], ['% Precisione', row[3]]];
    values.forEach(([label, value], valueIndex) => {
      const y = statsY + 92 + valueIndex * 29;
      context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, y - 10); context.lineTo(x + columnWidth - 8, y - 10); context.stroke();
      context.textAlign = 'left'; context.font = 'bold 12px Arial'; context.fillStyle = '#17394c'; context.fillText(label, x + 14, y + 7);
      context.textAlign = 'right'; context.font = 'bold 14px Arial'; context.fillStyle = valueIndex === 2 ? '#15803d' : '#111'; context.fillText(String(value), x + columnWidth - 14, y + 7);
    });
  });
  const passRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#passStatsTable tr[data-side="${side}"]`);
    const values = [...(row?.querySelectorAll('input') || [])].map(input => Number(input.value) || 0);
    const total = values[0] || 0, successful = values[1] || 0;
    return [teams[side].name, total, successful, `${total ? Math.round(successful / total * 100) : 0}%`];
  });
  const passX = 45, passWidth = 520;
  context.fillStyle = '#17394c'; context.fillRect(passX, statsY, passWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff';
  context.fillText('STATISTICHE PASSAGGI', passX + passWidth / 2, statsY + 19);
  passRows.forEach((row, index) => {
    const x = passX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, statsY + 28, columnWidth, 158);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, statsY + 28, columnWidth, 158);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) {
      const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize;
      const width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size;
      context.drawImage(logo, x + columnWidth / 2 - width / 2, statsY + 36, width, height);
    } else { context.font = 'bold 12px Arial'; context.fillStyle = '#17394c'; context.fillText(row[0], x + columnWidth / 2, statsY + 66); }
    [['Passaggi totali', row[1]], ['Passaggi riusciti', row[2]], ['% Precisione', row[3]]].forEach(([label, value], valueIndex) => {
      const y = statsY + 92 + valueIndex * 29;
      context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, y - 10); context.lineTo(x + columnWidth - 8, y - 10); context.stroke();
      context.textAlign = 'left'; context.font = 'bold 12px Arial'; context.fillStyle = '#17394c'; context.fillText(label, x + 14, y + 7);
      context.textAlign = 'right'; context.font = 'bold 14px Arial'; context.fillStyle = valueIndex === 2 ? '#15803d' : '#111'; context.fillText(String(value), x + columnWidth - 14, y + 7);
    });
  });
  const possessionRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#possessionStatsTable tr[data-side="${side}"]`);
    return [teams[side].name, `${Number(row?.querySelector('input')?.value) || 0}%`];
  });
  const possessionX = 1175, possessionY = topStatsY, possessionWidth = 520;
  context.fillStyle = '#17394c'; context.fillRect(possessionX, possessionY, possessionWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff';
  context.fillText('POSSESSO PALLA', possessionX + possessionWidth / 2, possessionY + 19);
  possessionRows.forEach((row, index) => {
    const x = possessionX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, possessionY + 28, columnWidth, 158);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, possessionY + 28, columnWidth, 158);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) {
      const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize;
      const width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size;
      context.drawImage(logo, x + columnWidth / 2 - width / 2, possessionY + 36, width, height);
    } else { context.font = 'bold 12px Arial'; context.fillStyle = '#17394c'; context.fillText(row[0], x + columnWidth / 2, possessionY + 66); }
    const y = possessionY + 115;
    context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, y - 10); context.lineTo(x + columnWidth - 8, y - 10); context.stroke();
    context.textAlign = 'left'; context.font = 'bold 13px Arial'; context.fillStyle = '#17394c'; context.fillText('Possesso', x + 18, y + 8);
    context.textAlign = 'right'; context.font = 'bold 20px Arial'; context.fillStyle = '#15803d'; context.fillText(row[1], x + columnWidth - 18, y + 9);
  });
  const idpRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#idpStatsTable tr[data-side="${side}"]`);
    return [teams[side].name, Number(row?.querySelector('input')?.value) || 0];
  });
  const idpX = 1175, idpY = statsY, idpWidth = 520;
  context.fillStyle = '#17394c'; context.fillRect(idpX, idpY, idpWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText('IDP', idpX + idpWidth / 2, idpY + 19);
  idpRows.forEach((row, index) => {
    const x = idpX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, idpY + 28, columnWidth, 108);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, idpY + 28, columnWidth, 108);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) { const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize, width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size; context.drawImage(logo, x + columnWidth / 2 - width / 2, idpY + 35, width, height); }
    context.textAlign = 'left'; context.font = 'bold 13px Arial'; context.fillStyle = '#17394c'; context.fillText('IDP', x + 18, idpY + 102);
    context.textAlign = 'right'; context.font = 'bold 20px Arial'; context.fillStyle = '#15803d'; context.fillText(String(row[1]), x + columnWidth - 18, idpY + 103);
  });
  const ipoRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#ipoStatsTable tr[data-side="${side}"]`);
    return [teams[side].name, ...['ipo', 'actions', 'set-pieces'].map(key => Number(row?.querySelector(`[data-ipo="${key}"]`)?.value) || 0)];
  });
  const ipoX = 45, ipoY = statsY + 365, ipoWidth = 520;
  context.fillStyle = '#17394c'; context.fillRect(ipoX, ipoY, ipoWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText('IPO', ipoX + ipoWidth / 2, ipoY + 19);
  ipoRows.forEach((row, index) => {
    const x = ipoX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, ipoY + 28, columnWidth, 136);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, ipoY + 28, columnWidth, 136);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) { const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize, width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size; context.drawImage(logo, x + columnWidth / 2 - width / 2, ipoY + 35, width, height); }
    [['IPO', row[1]], ['IPO Azioni', row[2]], ['IPO Palle Inattive', row[3]]].forEach(([label, value], valueIndex) => {
      const y = ipoY + 82 + valueIndex * 25;
      context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, y - 8); context.lineTo(x + columnWidth - 8, y - 8); context.stroke();
      context.textAlign = 'left'; context.font = 'bold 11px Arial'; context.fillStyle = '#17394c'; context.fillText(label, x + 12, y + 7);
      context.textAlign = 'right'; context.font = 'bold 14px Arial'; context.fillStyle = '#15803d'; context.fillText(String(value), x + columnWidth - 12, y + 7);
    });
  });
  const ballRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#ballStatsTable tr[data-side="${side}"]`);
    return [teams[side].name, ...['played', 'recovered', 'lost'].map(key => Number(row?.querySelector(`[data-ball="${key}"]`)?.value) || 0)];
  });
  const ballX = 610, ballY = topStatsY, ballWidth = 520;
  context.fillStyle = '#17394c'; context.fillRect(ballX, ballY, ballWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText('GESTIONE PALLE', ballX + ballWidth / 2, ballY + 19);
  ballRows.forEach((row, index) => {
    const x = ballX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, ballY + 28, columnWidth, 136);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, ballY + 28, columnWidth, 136);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) { const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize, width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size; context.drawImage(logo, x + columnWidth / 2 - width / 2, ballY + 35, width, height); }
    [['Palle giocate', row[1]], ['Palle recuperate', row[2]], ['Palle perse', row[3]]].forEach(([label, value], valueIndex) => {
      const y = ballY + 82 + valueIndex * 25;
      context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, y - 8); context.lineTo(x + columnWidth - 8, y - 8); context.stroke();
      context.textAlign = 'left'; context.font = 'bold 11px Arial'; context.fillStyle = '#17394c'; context.fillText(label, x + 12, y + 7);
      context.textAlign = 'right'; context.font = 'bold 14px Arial'; context.fillStyle = '#15803d'; context.fillText(String(value), x + columnWidth - 12, y + 7);
    });
  });
  const actionRows = ['home', 'away'].map(side => {
    const row = document.querySelector(`#matchActionsStatsTable tr[data-side="${side}"]`);
    return [teams[side].name, ...['corners', 'free-kicks', 'penalties', 'fouls', 'yellow-cards', 'red-cards'].map(key => Number(row?.querySelector(`[data-action="${key}"]`)?.value) || 0)];
  });
  const actionsX = 45, actionsY = topStatsY, actionsWidth = 520;
  context.fillStyle = '#17394c'; context.fillRect(actionsX, actionsY, actionsWidth, 28);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText('AZIONI PARTITA', actionsX + actionsWidth / 2, actionsY + 19);
  actionRows.forEach((row, index) => {
    const x = actionsX + index * columnWidth;
    context.fillStyle = '#fff'; context.fillRect(x, actionsY + 28, columnWidth, 210);
    context.strokeStyle = '#b9cbd4'; context.strokeRect(x, actionsY + 28, columnWidth, 210);
    const logo = index === 0 ? homeLogo : awayLogo;
    if (logo?.naturalWidth) { const ratio = logo.naturalWidth / logo.naturalHeight, size = tableLogoSize, width = ratio >= 1 ? size : size * ratio, height = ratio >= 1 ? size / ratio : size; context.drawImage(logo, x + columnWidth / 2 - width / 2, actionsY + 34, width, height); }
    [['Corner', row[1]], ['Punizioni', row[2]], ['Rigori', row[3]], ['Falli', row[4]], ['Cartellini gialli', row[5]], ['Cartellini rossi', row[6]]].forEach(([label, value], valueIndex) => {
      const y = actionsY + 76 + valueIndex * 24;
      context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, y - 8); context.lineTo(x + columnWidth - 8, y - 8); context.stroke();
      context.textAlign = 'left'; context.font = 'bold 11px Arial'; context.fillStyle = '#17394c'; context.fillText(label, x + 12, y + 7);
      context.textAlign = 'right'; context.font = 'bold 14px Arial'; context.fillStyle = '#15803d'; context.fillText(String(value), x + columnWidth - 12, y + 7);
    });
  });
  // Il grafico è parte della tabella dei tiri: viene disegnato subito sotto i valori.
  const shotChartX = statsX, shotChartY = statsY + 186, shotChartWidth = statsWidth, shotChartHeight = 140;
  context.fillStyle = '#fff'; context.fillRect(shotChartX, shotChartY, shotChartWidth, shotChartHeight);
  context.strokeStyle = '#b9cbd4'; context.strokeRect(shotChartX, shotChartY, shotChartWidth, shotChartHeight);
  const shotChartMetrics = [
    { label: 'TIRI TOTALI', values: [Number(shotRows[0][1]) || 0, Number(shotRows[1][1]) || 0] },
    { label: 'TIRI RIUSCITI', values: [Number(shotRows[0][2]) || 0, Number(shotRows[1][2]) || 0] },
    { label: '% PRECISIONE', values: shotRows.map(row => (Number(row[1]) ? Math.round(Number(row[2]) / Number(row[1]) * 100) : 0)), maximum: 100, suffix: '%' }
  ];
  shotChartMetrics.forEach((metric, metricIndex) => {
    const maximum = metric.maximum || Math.max(1, ...metric.values);
    const centerX = shotChartX + 95 + metricIndex * 165;
    const baselineY = shotChartY + 112;
    context.strokeStyle = '#b9cbd4'; context.beginPath(); context.moveTo(centerX - 52, baselineY); context.lineTo(centerX + 52, baselineY); context.stroke();
    metric.values.forEach((value, teamIndex) => {
      const barHeight = value ? Math.max(4, value / maximum * 64) : 0;
      const barX = centerX + (teamIndex ? 7 : -34);
      const barColor = chartTeamColors()[teamIndex ? 'away' : 'home'];
      context.fillStyle = barColor; context.fillRect(barX, baselineY - barHeight, 27, barHeight);
      if (isWhiteTeamColor(barColor)) { context.strokeStyle = '#111'; context.lineWidth = 1.5; context.strokeRect(barX + .5, baselineY - barHeight + .5, 26, Math.max(0, barHeight - 1)); }
      context.textAlign = 'center'; context.font = 'bold 10px Arial'; context.fillStyle = '#111'; context.fillText(`${value}${metric.suffix || ''}`, barX + 13.5, baselineY - barHeight - 4);
    });
    context.textAlign = 'center'; context.font = 'bold 10px Arial'; context.fillStyle = '#17394c'; context.fillText(metric.label, centerX, shotChartY + 132);
  });
  const drawComparisonChart = (x, y, chartWidth, chartHeight, metrics, colors) => {
    context.fillStyle = '#fff'; context.fillRect(x, y, chartWidth, chartHeight);
    context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(x, y, chartWidth, chartHeight);
    metrics.forEach((metric, metricIndex) => {
      const maximum = metric.maximum || Math.max(1, ...metric.values);
      const centerX = x + chartWidth * (metricIndex + .5) / metrics.length;
      const baselineY = y + chartHeight - 28;
      context.strokeStyle = '#b9cbd4'; context.beginPath(); context.moveTo(centerX - 52, baselineY); context.lineTo(centerX + 52, baselineY); context.stroke();
      metric.values.forEach((value, teamIndex) => {
        const barHeight = value ? Math.max(4, value / maximum * 64) : 0;
        const barX = centerX + (teamIndex ? 7 : -34);
        const barColor = colors?.[teamIndex ? 'away' : 'home'] || (teamIndex ? '#2563eb' : '#ef4444');
        context.fillStyle = barColor; context.fillRect(barX, baselineY - barHeight, 27, barHeight);
        if (isWhiteTeamColor(barColor)) { context.strokeStyle = '#111'; context.lineWidth = 1.5; context.strokeRect(barX + .5, baselineY - barHeight + .5, 26, Math.max(0, barHeight - 1)); }
        context.textAlign = 'center'; context.font = 'bold 10px Arial'; context.fillStyle = '#111'; context.fillText(`${value}${metric.suffix || ''}`, barX + 13.5, baselineY - barHeight - 4);
      });
      context.textAlign = 'center'; context.font = 'bold 10px Arial'; context.fillStyle = '#17394c'; context.fillText(metric.label, centerX, y + chartHeight - 8);
    });
  };
  drawComparisonChart(passX, statsY + 186, passWidth, 140, [
    { label: 'PASSAGGI TOTALI', values: [passRows[0][1], passRows[1][1]] },
    { label: 'PASSAGGI RIUSCITI', values: [passRows[0][2], passRows[1][2]] },
    { label: '% PRECISIONE', values: passRows.map(row => Number(row[1]) ? Math.round(Number(row[2]) / Number(row[1]) * 100) : 0), maximum: 100, suffix: '%' }
  ], chartTeamColors());
  drawComparisonChart(idpX, idpY + 136, idpWidth, 140, [
    { label: 'IDP', values: idpRows.map(row => row[1]) }
  ], chartTeamColors());
  drawComparisonChart(ipoX, ipoY + 164, ipoWidth, 140, [
    { label: 'IPO', values: ipoRows.map(row => row[1]) },
    { label: 'IPO AZIONI', values: ipoRows.map(row => row[2]) },
    { label: 'IPO PALLE INATTIVE', values: ipoRows.map(row => row[3]) }
  ], chartTeamColors());
  const drawCenteredStatTable = (x, y, tableWidth, tableHeight, title, labels, rows) => {
    const headerHeight = 28, teamHeight = 48, rowHeight = (tableHeight - headerHeight - teamHeight) / labels.length;
    const homeX = x + tableWidth * .23, centerX = x + tableWidth / 2, awayX = x + tableWidth * .77;
    context.fillStyle = '#17394c'; context.fillRect(x, y, tableWidth, headerHeight);
    context.fillStyle = '#fff'; context.fillRect(x, y + headerHeight, tableWidth, tableHeight - headerHeight);
    context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(x, y, tableWidth, tableHeight);
    context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText(title, centerX, y + 19);
    [[homeLogo, homeX, rows[0][0]], [awayLogo, awayX, rows[1][0]]].forEach(([logo, logoX, name]) => {
      if (logo?.naturalWidth) { const ratio = logo.naturalWidth / logo.naturalHeight, width = ratio >= 1 ? tableLogoSize : tableLogoSize * ratio, height = ratio >= 1 ? tableLogoSize / ratio : tableLogoSize; context.drawImage(logo, logoX - width / 2, y + 33, width, height); }
    });
    labels.forEach((label, index) => {
      const rowY = y + headerHeight + teamHeight + index * rowHeight;
      context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(x + 8, rowY); context.lineTo(x + tableWidth - 8, rowY); context.stroke();
      context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = '#17394c'; context.fillText(label, centerX, rowY + rowHeight / 2 + 5, tableWidth * .42);
      const teamColors = chartTeamColors();
      context.font = 'bold 16px Arial'; drawTeamValue(rows[0][index + 1], homeX, rowY + rowHeight / 2 + 6, teamColors.home);
      drawTeamValue(rows[1][index + 1], awayX, rowY + rowHeight / 2 + 6, teamColors.away);
    });
  };
  drawCenteredStatTable(actionsX, actionsY, actionsWidth, 238, 'AZIONI PARTITA', ['Corner', 'Punizioni', 'Rigori', 'Falli', 'Cartellini gialli', 'Cartellini rossi'], actionRows);
  drawCenteredStatTable(ballX, ballY, ballWidth, 164, 'GESTIONE PALLE', ['Palle giocate', 'Palle recuperate', 'Palle perse'], ballRows);
  drawCenteredStatTable(possessionX, possessionY, possessionWidth, 105, 'POSSESSO PALLA', ['Possesso'], possessionRows);
  const drawPossessionPie = (x, y, tableWidth, tableHeight, rows) => {
    const home = Number(String(rows[0][1]).replace('%', '')) || 0, away = Number(String(rows[1][1]).replace('%', '')) || 0, total = home + away || 1, split = home / total * Math.PI * 2, centerX = x + tableWidth / 2, centerY = y + tableHeight / 2, radiusX = 48, radiusY = 48, colors = chartTeamColors();
    context.fillStyle = '#fff'; context.fillRect(x, y, tableWidth, tableHeight); context.strokeStyle = '#b9cbd4'; context.strokeRect(x, y, tableWidth, tableHeight);
    const pieStart = Math.PI / 2;
    [[colors.home, pieStart, pieStart + split], [colors.away, pieStart + split, pieStart + Math.PI * 2]].forEach(([color, start, end]) => { context.fillStyle = color; context.beginPath(); context.moveTo(centerX, centerY); context.ellipse(centerX, centerY, radiusX, radiusY, 0, start, end); context.closePath(); context.fill(); if (isWhiteTeamColor(color)) { context.strokeStyle = '#111'; context.lineWidth = 1.5; context.stroke(); } });
    context.strokeStyle = String(colors.home).toLowerCase() === '#ffffff' || String(colors.away).toLowerCase() === '#ffffff' ? '#111' : '#31596d'; context.lineWidth = 1; context.beginPath(); context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2); context.stroke();
    [[homeLogo, 0, home / total], [awayLogo, home / total, away / total]].forEach(([logo, start, portion]) => { if (!logo?.naturalWidth) return; const angle = (180 + (start + portion / 2) * 360) * Math.PI / 180, radians = Math.max(.01, portion * Math.PI * 2), radius = Math.max(.12, Math.min(.46, (4 * Math.sin(radians / 2)) / (3 * radians))), logoX = centerX + Math.sin(angle) * radiusX * radius, logoY = centerY - Math.cos(angle) * radiusY * radius, ratio = logo.naturalWidth / logo.naturalHeight, size = 32, logoWidth = ratio >= 1 ? size : size * ratio, logoHeight = ratio >= 1 ? size / ratio : size; context.drawImage(logo, logoX - logoWidth / 2, logoY - logoHeight / 2, logoWidth, logoHeight); });
  };
  drawPossessionPie(possessionX, possessionY + 105, possessionWidth, 133, possessionRows);
  drawCenteredStatTable(passX, statsY, passWidth, 186, 'STATISTICHE PASSAGGI', ['Passaggi totali', 'Passaggi riusciti', '% Precisione'], passRows);
  drawCenteredStatTable(statsX, statsY, statsWidth, 186, 'STATISTICHE TIRI', ['Tiri totali', 'Tiri riusciti', '% Precisione'], shotRows);
  drawCenteredStatTable(idpX, idpY, idpWidth, 136, 'IDP', ['IDP'], idpRows);
  drawCenteredStatTable(ipoX, ipoY, ipoWidth, 164, 'IPO', ['IPO', 'IPO Azioni', 'IPO Palle Inattive'], ipoRows);
  // Tabella per periodi: compare solo nel PDF completo, perché il PDF
  // semplificato viene ritagliato prima delle statistiche.
  const periodTables = [
    [document.querySelector('#periodStatsTable'), homeLogo],
    [document.querySelector('#periodStatsAwayTable'), awayLogo]
  ].filter(([table]) => table);
  let fullPdfContentBottom = ipoY + 304;
  let nextPeriodX = ipoX + ipoWidth + 25;
  periodTables.forEach(([periodTable, periodLogo]) => {
    const periodRows = [...periodTable.querySelectorAll('tr[data-period]')].map(row => {
      const number = name => Number(row.querySelector(`[data-field="${name}"]`)?.value) || 0;
      const shots = number('shots'), onTarget = number('on-target');
      const passes = number('passes'), completed = number('completed-passes');
      return [row.querySelector('th')?.textContent.trim() || '', number('goals'), shots, onTarget, shots ? `${Math.round(onTarget / shots * 100)}%` : '0%', '', number('passes'), completed, passes ? `${Math.round(completed / passes * 100)}%` : '0%', '', number('possession-minutes'), `${number('possession-percent')}%`];
    });
    const displayedPeriodRows = periodRows.flatMap((row, index) => (index === 0 || index === 2) ? [row, { blank: true }] : [row]);
    const headers = ['Periodo', 'Gol', 'Tiri tot.', 'Tiri sp.', '% prec.', '', 'Pass.', 'Pass. riusc.', '% prec.', '', 'Min. poss.', '% poss.'];
    const valuesByColumn = headers.map((_, columnIndex) => periodRows.map(row => String(row[columnIndex] ?? '')));
    const widths = headers.map((header, columnIndex) => {
      context.font = 'bold 8px Arial';
      const headingWidth = context.measureText(header.toUpperCase()).width;
      context.font = columnIndex === 0 ? 'bold 9px Arial' : '9px Arial';
      const valueWidth = Math.max(...valuesByColumn[columnIndex].map(value => context.measureText(value).width), 0);
      if (header === '') return 10;
      return Math.max(columnIndex === 0 ? 52 : 38, Math.ceil(Math.max(headingWidth, valueWidth) + 16));
    });
    const periodWidth = widths.reduce((total, columnWidth) => total + columnWidth, 0);
    const periodY = ipoY, periodX = nextPeriodX;
    const headerHeight = 27, rowHeight = 17;
    context.fillStyle = '#17394c'; context.fillRect(periodX, periodY, periodWidth, 26);
    if (periodLogo?.naturalWidth) {
      const ratio = periodLogo.naturalWidth / periodLogo.naturalHeight, size = 20;
      const logoWidth = ratio >= 1 ? size : size * ratio, logoHeight = ratio >= 1 ? size / ratio : size;
      context.drawImage(periodLogo, periodX + 8, periodY + 3, logoWidth, logoHeight);
    }
    context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText('STATISTICHE PER PERIODI', periodX + periodWidth / 2, periodY + 18);
    const periodRowsHeight = displayedPeriodRows.reduce((total, row) => total + (row.blank ? 8 : rowHeight), 0);
    context.fillStyle = '#fff'; context.fillRect(periodX, periodY + 26, periodWidth, headerHeight + periodRowsHeight);
    context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(periodX, periodY, periodWidth, 26 + headerHeight + periodRowsHeight);
    let columnX = periodX;
    headers.forEach((header, index) => { context.fillStyle = '#edf4f6'; context.fillRect(columnX, periodY + 26, widths[index], headerHeight); context.strokeStyle = '#b9cbd4'; context.strokeRect(columnX, periodY + 26, widths[index], headerHeight); context.textAlign = 'center'; context.font = 'bold 8px Arial'; context.fillStyle = '#17394c'; context.fillText(header.toUpperCase(), columnX + widths[index] / 2, periodY + 43, widths[index] - 4); columnX += widths[index]; });
    let rowY = periodY + 26 + headerHeight;
    displayedPeriodRows.forEach(values => {
      const currentRowHeight = values.blank ? 8 : rowHeight;
      let x = periodX;
      const rowValues = values.blank ? headers.map(() => '') : values;
      rowValues.forEach((value, index) => { const gap = index === 5 || index === 9; if (values.blank || gap) { context.fillStyle = '#d9e0e4'; context.fillRect(x, rowY, widths[index], currentRowHeight); } context.strokeStyle = '#aebcc4'; context.strokeRect(x, rowY, widths[index], currentRowHeight); if (!values.blank && !gap) { context.textAlign = index === 0 ? 'left' : 'center'; context.font = index === 0 ? 'bold 9px Arial' : '9px Arial'; context.fillStyle = index === 4 || index === 8 || index === 11 ? '#15803d' : '#17394c'; context.fillText(String(value), index === 0 ? x + 5 : x + widths[index] / 2, rowY + 12, widths[index] - 6); } x += widths[index]; });
      if (!values.blank && (values[0] === '45+' || values[0] === '90+')) { context.beginPath(); context.moveTo(periodX, rowY + currentRowHeight); context.lineTo(periodX + periodWidth, rowY + currentRowHeight); context.strokeStyle = '#8ba0aa'; context.lineWidth = 3; context.stroke(); context.lineWidth = 1; }
      rowY += currentRowHeight;
    });
    nextPeriodX += periodWidth + 18;
  });
  if (periodTables.length) {
    const sharedPeriodX = ipoX + ipoWidth + 25, sharedPeriodWidth = nextPeriodX - sharedPeriodX - 18;
    context.fillStyle = '#17394c'; context.fillRect(sharedPeriodX, ipoY, sharedPeriodWidth, 26);
    const periodTeamColors = chartTeamColors();
    [[homeLogo, sharedPeriodX + 8, periodTeamColors.home, 'home'], [awayLogo, sharedPeriodX + sharedPeriodWidth - 28, periodTeamColors.away, 'away']].forEach(([logo, x, color, side]) => {
      if (logo?.naturalWidth) {
        const ratio = logo.naturalWidth / logo.naturalHeight, size = 20;
        const logoWidth = ratio >= 1 ? size : size * ratio, logoHeight = ratio >= 1 ? size / ratio : size;
        context.drawImage(logo, x + (20 - logoWidth) / 2, ipoY + 3, logoWidth, logoHeight);
      }
      const colorX = side === 'home' ? x + 24 : x - 14;
      context.fillStyle = color; context.fillRect(colorX, ipoY + 8, 10, 10);
      context.strokeStyle = isWhiteTeamColor(color) ? '#111' : '#fff'; context.lineWidth = 1; context.strokeRect(colorX, ipoY + 8, 10, 10);
    });
    context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#fff'; context.fillText('STATISTICHE PER PERIODI', sharedPeriodX + sharedPeriodWidth / 2, ipoY + 18);
    const homePeriodTable = document.querySelector('#periodStatsTable');
    const awayPeriodTable = document.querySelector('#periodStatsAwayTable');
    const periodLabels = [...(homePeriodTable?.querySelectorAll('tr[data-period]') || [])].slice(3).map(row => row.querySelector('th')?.textContent.trim() || '');
    const possessionValues = table => [...(table?.querySelectorAll('tr[data-period]') || [])].slice(3).map(row => Math.min(100, Math.max(0, Number(row.querySelector('[data-field="possession-percent"]')?.value) || 0)));
    const homePossession = possessionValues(homePeriodTable), awayPossession = possessionValues(awayPeriodTable);
    const chartX = ipoX + ipoWidth + 25, chartY = ipoY + 270, chartWidth = nextPeriodX - chartX - 18, chartHeight = 230, chartLeft = 58, chartRight = 26, chartTop = 44, chartBottom = 43;
    const plotLeft = chartX + chartLeft, plotRight = chartX + chartWidth - chartRight, plotTop = chartY + chartTop, plotBottom = chartY + chartHeight - chartBottom;
    const pointX = index => plotLeft + index * (plotRight - plotLeft) / Math.max(1, periodLabels.length - 1);
    const pointY = value => plotBottom - value / 100 * (plotBottom - plotTop);
    context.fillStyle = '#fff'; context.fillRect(chartX, chartY, chartWidth, chartHeight);
    context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(chartX, chartY, chartWidth, chartHeight);
    context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillStyle = '#17394c'; context.fillText('ANDAMENTO POSSESSO PALLA', chartX + chartWidth / 2, chartY + 21);
    [0, 25, 50, 75, 100].forEach(value => { const y = pointY(value); context.strokeStyle = '#d2e0e5'; context.beginPath(); context.moveTo(plotLeft, y); context.lineTo(plotRight, y); context.stroke(); context.textAlign = 'right'; context.font = '10px Arial'; context.fillStyle = '#17394c'; context.fillText(`${value}%`, plotLeft - 8, y + 3); });
    const colors = { home: teams.home.playerColor1 || teams.home.kit || '#ef4444', away: teams.away.playerColor1 || teams.away.kit || '#2563eb' };
    const drawPossessionLine = (values, color, dashed) => {
      const drawPath = () => { context.beginPath(); values.forEach((value, index) => { const x = pointX(index), y = pointY(value); if (index) context.lineTo(x, y); else context.moveTo(x, y); }); };
      context.save(); context.setLineDash(dashed ? [8, 5] : []);
      if (isWhiteTeamColor(color)) { context.strokeStyle = '#111'; context.lineWidth = 6; drawPath(); context.stroke(); }
      context.strokeStyle = color; context.lineWidth = 3; drawPath(); context.stroke(); context.setLineDash([]);
      values.forEach((value, index) => { context.beginPath(); context.arc(pointX(index), pointY(value), isWhiteTeamColor(color) ? 5 : 4, 0, Math.PI * 2); context.fillStyle = isWhiteTeamColor(color) ? '#111' : color; context.fill(); if (isWhiteTeamColor(color)) { context.beginPath(); context.arc(pointX(index), pointY(value), 3, 0, Math.PI * 2); context.fillStyle = '#fff'; context.fill(); } }); context.restore();
    };
    drawPossessionLine(homePossession, colors.home, false);
    drawPossessionLine(awayPossession, colors.away, false);
    periodLabels.forEach((label, index) => { context.textAlign = 'center'; context.font = '9px Arial'; context.fillStyle = '#17394c'; context.fillText(label, pointX(index), plotBottom + 18); });
    [[teams.home.name || 'Team 1', colors.home, chartX + chartWidth / 2 - 135], [teams.away.name || 'Team 2', colors.away, chartX + chartWidth / 2 + 35]].forEach(([name, color, x]) => { context.setLineDash([]); context.beginPath(); context.moveTo(x, chartY + 33); context.lineTo(x + 22, chartY + 33); if (isWhiteTeamColor(color)) { context.strokeStyle = '#111'; context.lineWidth = 6; context.stroke(); context.beginPath(); context.moveTo(x, chartY + 33); context.lineTo(x + 22, chartY + 33); } context.strokeStyle = color; context.lineWidth = 3; context.stroke(); context.textAlign = 'left'; context.font = '10px Arial'; context.fillStyle = '#17394c'; context.fillText(name, x + 28, chartY + 36); });
    fullPdfContentBottom = Math.max(fullPdfContentBottom, chartY + chartHeight + 28);
  }
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = canvas.width;
  croppedCanvas.height = Math.min(canvas.height, Math.ceil(fullPdfContentBottom));
  croppedCanvas.getContext('2d').drawImage(canvas, 0, 0);
  croppedCanvas.simplePdfHeight = Math.min(croppedCanvas.height, canvas.simplePdfHeight || croppedCanvas.height);
  return croppedCanvas;
}

document.addEventListener('click', async event => {
  const simple = event.target.closest('#simplePdfBtn');
  if (!simple && !event.target.closest('#pdfBtn')) return;
  try {
    const [competitionLogo, homeLogo, awayLogo] = await Promise.all([
      loadPdfImage(selectedCompetitionLogo()),
      loadPdfImage(teams.home.logo || ''),
      loadPdfImage(teams.away.logo || '')
    ]);
    const canvas = createPdfCanvas(competitionLogo, homeLogo, awayLogo);
    if (!simple) {
      downloadPdfFromCanvas(canvas);
      return;
    }
    const simplified = document.createElement('canvas');
    simplified.width = canvas.width;
    simplified.height = Math.min(canvas.height, canvas.simplePdfHeight || canvas.height);
    simplified.getContext('2d').drawImage(canvas, 0, 0, canvas.width, simplified.height, 0, 0, canvas.width, simplified.height);
    downloadPdfFromCanvas(simplified, true);
  }
  catch (error) { alert('Impossibile creare il PDF.'); }
});

document.addEventListener('click', event => {
  const choice = event.target.closest('.competition-options button');
  if (choice) document.querySelector('.competition-title').dataset.selectedCompetition = choice.textContent.trim();
});

window.createPdfStyleImage = async function(){
  const preview = window.open('about:blank', 'lavagna-calcio-immagine');
  if (!preview) { alert('Consenti le finestre popup per aprire l’immagine.'); return; }
  try {
    const [competitionLogo, homeLogo, awayLogo] = await Promise.all([
      loadPdfImage(selectedCompetitionLogo()),
      loadPdfImage(teams.home.logo || ''),
      loadPdfImage(teams.away.logo || '')
    ]);
    const canvas = createPdfCanvas(competitionLogo, homeLogo, awayLogo);
    // L'immagine contiene soltanto il rettangolo del campo: nessuna
    // intestazione, riga di arbitro/assistenti, elenco giocatori laterale,
    // moduli di formazione, statistiche o tabelle.
    const field = { x: 390, y: 270, width: 1020, height: 663 };
    // Il ritaglio parte dal bordo verde del campo, quindi esclude anche
    // punteggio, nomi e loghi delle due squadre.
    const imageCanvas = document.createElement('canvas');
    imageCanvas.width = field.width;
    imageCanvas.height = field.height;
    imageCanvas.getContext('2d').drawImage(
      canvas,
      field.x, field.y, field.width, field.height,
      0, 0, field.width, field.height
    );
    imageCanvas.toBlob(blob => {
      if (!blob) { preview.close(); alert('Impossibile creare l’immagine.'); return; }
      const url = URL.createObjectURL(blob);
      preview.location.replace(url);
      preview.focus();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }, 'image/png');
  } catch (error) {
    preview.close();
    alert('Impossibile creare l’immagine.');
  }
};
window.createPdfStyleImage = function(){
  const preview = window.open('about:blank', 'lavagna-calcio-immagine');
  if (!preview) return;
  const imageCanvas = document.createElement('canvas');
  imageCanvas.width = 1020;
  imageCanvas.height = 663;
  const context = imageCanvas.getContext('2d');
  const width = imageCanvas.width, height = imageCanvas.height;
  const x = value => value / 1000 * width;
  const y = value => value / 650 * height;

  context.fillStyle = '#249b57';
  context.fillRect(0, 0, width, height);
  for (let stripe = 0; stripe < 12; stripe += 1) {
    if (stripe % 2) continue;
    context.fillStyle = '#209451';
    context.fillRect(stripe * width / 12, 0, width / 12, height);
  }
  context.strokeStyle = '#fff';
  context.fillStyle = '#fff';
  context.lineWidth = 4;
  context.strokeRect(x(4), y(4), x(992), y(642));
  context.beginPath(); context.moveTo(x(500), y(4)); context.lineTo(x(500), y(646)); context.stroke();
  context.beginPath(); context.arc(x(500), y(325), x(85), 0, Math.PI * 2); context.stroke();
  context.beginPath(); context.arc(x(500), y(325), x(6), 0, Math.PI * 2); context.fill();
  [[4,145,145,360],[4,220,55,210],[851,145,145,360],[941,220,55,210]].forEach(([left,top,boxWidth,boxHeight]) => context.strokeRect(x(left), y(top), x(boxWidth), y(boxHeight)));
  [[105,325],[895,325]].forEach(([pointX,pointY]) => { context.beginPath(); context.arc(x(pointX), y(pointY), x(5), 0, Math.PI * 2); context.fill(); });
  context.beginPath(); context.arc(x(149), y(325), x(85), -0.78, 0.78); context.stroke();
  context.beginPath(); context.arc(x(851), y(325), x(85), Math.PI - 0.78, Math.PI + 0.78); context.stroke();

  imageCanvas.toBlob(blob => {
    if (!blob) { preview.close(); return; }
    const url = URL.createObjectURL(blob);
    preview.location.replace(url);
    preview.focus();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }, 'image/png');
};
window.openCompleteProjectPreview = window.createPdfStyleImage;

function loadJpgHeaderLogo(source) {
  return new Promise(resolve => {
    if (!source) { resolve(null); return; }
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

async function loadJpgAsset(source) {
  try {
    const response = await fetch(source);
    const blob = await response.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return loadJpgHeaderLogo(dataUrl);
  } catch {
    return null;
  }
}

async function createCleanPitchJpg() {
  const lineup = document.body.dataset.lineup || 'both';
  const visibleSide = side => lineup === 'both' || lineup === side;
  const visibleSides = ['home', 'away'].filter(visibleSide);
  const fieldPosition = (side, index) => {
    const point = positions[side][index] || [50, 50];
    if (lineup !== side) return point;
    const xs = (teams[side].players || []).map((_, playerIndex) => (positions[side][playerIndex] || [50, 50])[0]);
    const min = Math.min(...xs), max = Math.max(...xs), span = max - min || 1;
    return [8 + (point[0] - min) / span * 84, point[1]];
  };
  const canvas = document.createElement('canvas');
  canvas.width = 1800;
  const longestBench = Math.max(...visibleSides.map(side => teams[side].bench?.length || 0));
  const longestEventList = Math.max(
    ...visibleSides.map(side => (teams[side].eventLog?.length || 0) + (window.selectedTableEvents?.[side]?.length || 0) + (window.tableSwapEvents?.[side]?.length || 0))
  );
  canvas.height = Math.max(925, 220 + 32 + 11 * 31 + 16 + 8 + longestBench * 31 + 10 + 31 + 18, 220 + 663 + 520 + Math.max(1, longestEventList) * 32);
  const context = canvas.getContext('2d');
  const width = canvas.width, fieldHeight = 663, headerHeight = 220, fieldX = 390, fieldWidth = 1020;
  const dx = value => value / 1000 * fieldWidth;
  const dy = value => value / 650 * fieldHeight;
  const x = value => fieldX + dx(value);
  const y = value => headerHeight + dy(value);
  const competition = document.querySelector('.competition-title summary')?.textContent.trim()
    || document.querySelector('.competition-title')?.textContent.trim() || 'Competizione';
  const season = document.querySelector('.season-menu summary')?.textContent.trim()
    || document.querySelector('.season-menu')?.textContent.trim() || '';
  const day = document.querySelector('.match-day')?.textContent.trim() || '';
  const date = document.querySelector('.match-date')?.textContent.trim() || '';
  const venue = document.querySelector('#venueField')?.textContent.trim() || '';
  const officials = [...document.querySelectorAll('.official-detail')].map(item => item.textContent.trim()).filter(Boolean);
  const competitionLogo = selectedCompetitionLogo();
  const [headerLogo, refereeLogo, assistantLogo, homeLogo, awayLogo] = await Promise.all([
    loadJpgHeaderLogo(competitionLogo),
    loadJpgHeaderLogo(window.originalOfficialIcons?.referee || ''),
    loadJpgHeaderLogo(window.originalOfficialIcons?.assistant || ''),
    loadJpgHeaderLogo(String(teams.home.logo || '').startsWith('data:') ? teams.home.logo : ''),
    loadJpgHeaderLogo(String(teams.away.logo || '').startsWith('data:') ? teams.away.logo : '')
  ]);

  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const title = `${competition}${season ? ` · STAGIONE SPORTIVA ${season}` : ''}`;
  context.fillStyle = '#111'; context.font = 'bold 23px Arial';
  const titleWidth = context.measureText(title).width;
  const titleStart = (width - titleWidth - 62) / 2;
  context.textAlign = 'left'; context.fillText(title, titleStart + 62, 31);
  context.textAlign = 'center'; context.font = 'bold 14px Arial'; context.fillText([day, date].filter(Boolean).join('     '), width / 2, 64);
  context.font = '14px Arial'; context.fillText(venue, width / 2, 82);
  const drawOfficialIcon = (kind, iconX, iconY) => {
    context.save();
    const original = kind === 'referee' ? refereeLogo : assistantLogo;
    if (original?.naturalWidth) {
      const ratio = original.naturalWidth / original.naturalHeight;
      const size = kind === 'referee' ? 25 : 28;
      const originalWidth = ratio >= 1 ? size : size * ratio;
      const originalHeight = ratio >= 1 ? size / ratio : size;
      context.drawImage(original, iconX - originalWidth / 2, iconY - originalHeight / 2, originalWidth, originalHeight);
      context.restore();
      return;
    }
    if (kind === 'referee') {
      context.fillStyle = '#f6b728';
      context.fillRect(iconX - 10, iconY - 6, 18, 9);
      context.beginPath(); context.ellipse(iconX + 7, iconY + 4, 8, 6, 0, 0, Math.PI * 2); context.fill();
      context.strokeStyle = '#874307'; context.lineWidth = 1.5; context.strokeRect(iconX - 10, iconY - 6, 18, 9); context.stroke();
    } else {
      context.fillStyle = '#f6d44a'; context.fillRect(iconX - 9, iconY - 8, 10, 12);
      context.fillStyle = '#e43d30'; context.fillRect(iconX + 1, iconY - 8, 10, 12);
      context.strokeStyle = '#555'; context.lineWidth = 2; context.beginPath(); context.moveTo(iconX, iconY + 5); context.lineTo(iconX, iconY + 13); context.stroke();
    }
    context.restore();
  };
  const officialCenters = [660, 900, 1140];
  officials.forEach((official, index) => {
    const center = officialCenters[index] || width / 2;
    drawOfficialIcon(index === 0 ? 'referee' : 'assistant', center - 72, 102);
    context.textAlign = 'left'; context.font = '13px Arial'; context.fillStyle = '#111'; context.fillText(official, center - 50, 107);
  });
  if (headerLogo?.naturalWidth) {
    const ratio = headerLogo.naturalWidth / headerLogo.naturalHeight;
    const size = 54;
    const logoWidth = ratio >= 1 ? size : size * ratio;
    const logoHeight = ratio >= 1 ? size / ratio : size;
    context.drawImage(headerLogo, titleStart + 27 - logoWidth / 2, 5, logoWidth, logoHeight);
  }
  const drawTeam = (side, logo, name) => {
    const isHome = side === 'home';
    const logoCenter = isHome ? 570 : width - 570;
    if (logo?.naturalWidth) {
      const ratio = logo.naturalWidth / logo.naturalHeight;
      const size = 92;
      const logoWidth = ratio >= 1 ? size : size * ratio;
      const logoHeight = ratio >= 1 ? size / ratio : size;
      context.drawImage(logo, logoCenter - logoWidth / 2, 124, logoWidth, logoHeight);
    }
    context.textAlign = isHome ? 'left' : 'right';
    context.font = 'bold 26px Arial'; context.fillStyle = '#111';
    context.fillText(name || (isHome ? 'Team 1' : 'Team 2'), isHome ? 640 : width - 640, 182, 145);
  };
  if (visibleSide('home')) drawTeam('home', homeLogo, teams.home.name);
  if (visibleSide('away')) drawTeam('away', awayLogo, teams.away.name);
  context.textAlign = 'center'; context.font = 'bold 54px Arial'; context.fillStyle = '#111';
  const scoreText = lineup === 'home' ? (document.querySelector('#homeScore')?.textContent || 0) : lineup === 'away' ? (document.querySelector('#awayScore')?.textContent || 0) : `${document.querySelector('#homeScore')?.textContent || 0} - ${document.querySelector('#awayScore')?.textContent || 0}`;
  context.fillText(scoreText, width / 2, 193);

  const playerEvents = (side, player) => {
    const team = teams[side];
    const key = `${player[0]} ${player[1]}`;
    const events = [...(team.eventLog || []), ...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || []), ...(team._cardEvents || [])];
    const icons = [];
    const add = (symbol, color = '#fff', minute = '') => {
      if (symbol && !icons.some(icon => icon.symbol === symbol && icon.color === color && String(icon.minute) === String(minute || ''))) icons.push({ symbol, color, minute: String(minute || '') });
    };
    events.forEach(event => {
      const label = String(event.label || '');
      const change = event.type === 'swap' || label === 'Cambio' || label === 'Esce' || label === 'Entra';
      if (change) {
        const [outgoing = '', incoming = ''] = String(event.player || '').split(/→|â†’/).map(value => value.trim());
        if (event.outgoing === key || outgoing === key || (label === 'Esce' && event.player === key)) add('→', '#ef4444', event.minute || '');
        if (event.incoming === key || incoming === key || (label === 'Entra' && event.player === key)) add('←', '#15803d', event.minute || '');
        return;
      }
      if (event.player === key) add(event.icon, '#fff', event.minute || '');
    });
    (player._visibleEventMinutes || []).forEach(event => {
      if (event?.icon) add(event.icon, '#fff', event.minute || '');
    });
    const playerEntered = events.some(event => {
      const label = String(event.label || '');
      if (label === 'Entra' && event.player === key) return true;
      if (!(event.type === 'swap' || label === 'Cambio')) return false;
      const [, incoming = ''] = String(event.player || '').split(/→|â†’/).map(value => value.trim());
      return event.incoming === key || incoming === key;
    });
    return playerEntered ? icons.filter(icon => icon.symbol !== '→') : icons;
  };
  const jpgRosterName = player => {
    const flags = ['C', 'VC'].filter(flag => player?._listFlags?.[flag]).join(', ');
    const name = String(player?.[1] || '');
    const year = String(player?._underDetail || '').replace(/\D/g, '').slice(0, 2);
    const underYear = player?._listFlags?.U && year ? ` (${year})` : '';
    return `${flags ? `${name} (${flags})` : name}${underYear}`;
  };
  const drawRoster = side => {
    const team = teams[side];
    const isHome = side === 'home';
    const listX = isHome ? 45 : 1475;
    const rowWidth = 280;
    const titleX = isHome ? listX : listX + rowWidth;
    const players = [...(team.players || []), ...(team.bench || [])];
    const drawRow = (player, index, rowY) => {
      context.fillStyle = '#17394c'; context.fillRect(listX, rowY, rowWidth, 28);
      const shirt = drawPdfShirt(context, listX + 19, rowY + 14, team, player, .36);
      context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = shirt.numberColor;
      context.fillText(player[0], listX + 19, rowY + 19);
      context.textAlign = 'left'; context.font = '13px Arial'; context.fillStyle = '#fff';
      context.fillText(jpgRosterName(player), listX + 42, rowY + 19, 155);
      let eventX = listX + 204;
      playerEvents(side, player).forEach(event => {
        context.font = (event.symbol === '→' || event.symbol === '←') ? 'bold 17px Arial' : '14px Arial';
        context.fillStyle = event.color; context.fillText(event.symbol, eventX, rowY + 20);
        eventX += context.measureText(event.symbol).width + 5;
      });
    };
    context.textAlign = isHome ? 'left' : 'right'; context.font = 'bold 15px Arial'; context.fillStyle = '#111';
    context.fillText('TITOLARI', titleX, headerHeight + 29);
    (team.players || []).forEach((player, index) => drawRow(player, index, headerHeight + 32 + index * 31));
    const benchY = headerHeight + 32 + (team.players || []).length * 31 + 16;
    context.textAlign = isHome ? 'left' : 'right'; context.font = 'bold 15px Arial'; context.fillStyle = '#111';
    context.fillText('A DISPOSIZIONE', titleX, benchY + 5);
    (team.bench || []).forEach((player, index) => drawRow(player, index, benchY + 8 + index * 31));
    const legendY = benchY + 8 + (team.bench || []).length * 31 + 10;
    context.textAlign = 'left'; context.font = 'bold 10px Arial'; context.fillStyle = '#111';
    context.fillText('C = Capitano · VC = Vice Capitano · U = Under', listX + 2, legendY + 12, rowWidth - 4);
    const coachY = legendY + 35;
    context.fillStyle = '#0a2435'; context.fillRect(listX, coachY, rowWidth, 31);
    context.textAlign = 'left'; context.font = 'bold 16px Arial'; context.fillStyle = '#fff';
    context.fillText(`Allenatore: ${team.coach || ''}`, listX + 10, coachY + 21, rowWidth - 20);
  };
  if (visibleSide('home')) drawRoster('home');
  if (visibleSide('away')) drawRoster('away');

  context.fillStyle = '#249b57';
  context.fillRect(fieldX, headerHeight, fieldWidth, fieldHeight);
  for (let stripe = 0; stripe < 12; stripe += 1) {
    if (stripe % 2) continue;
    context.fillStyle = '#209451';
    context.fillRect(fieldX + stripe * fieldWidth / 12, headerHeight, fieldWidth / 12, fieldHeight);
  }
  context.strokeStyle = '#fff'; context.fillStyle = '#fff'; context.lineWidth = 4; context.lineCap = 'round'; context.lineJoin = 'round';
  context.strokeRect(x(4), y(4), dx(992), dy(642));
  context.beginPath(); context.moveTo(x(500), y(4)); context.lineTo(x(500), y(646)); context.stroke();
  context.beginPath(); context.arc(x(500), y(325), dx(85), 0, Math.PI * 2); context.stroke();
  context.beginPath(); context.arc(x(500), y(325), dx(6), 0, Math.PI * 2); context.fill();
  [[4,145,145,360],[4,220,55,210],[851,145,145,360],[941,220,55,210]].forEach(([left,top,boxWidth,boxHeight]) => context.strokeRect(x(left), y(top), dx(boxWidth), dy(boxHeight)));
  [[105,325],[895,325]].forEach(([pointX,pointY]) => { context.beginPath(); context.arc(x(pointX), y(pointY), dx(5), 0, Math.PI * 2); context.fill(); });
  // Lunette: gli estremi coincidono esattamente con la linea dell'area grande.
  const arcAngle = 0.786;
  context.beginPath(); context.ellipse(x(89), y(325), dx(85), dy(85), 0, -arcAngle, arcAngle); context.stroke();
  context.beginPath(); context.ellipse(x(911), y(325), dx(85), dy(85), 0, Math.PI - arcAngle, Math.PI + arcAngle); context.stroke();
  [[4,4,0,Math.PI/2],[996,4,Math.PI/2,Math.PI],[996,646,Math.PI,Math.PI*1.5],[4,646,Math.PI*1.5,Math.PI*2]].forEach(([cornerX,cornerY,start,end]) => { context.beginPath(); context.arc(x(cornerX), y(cornerY), dx(31), start, end); context.stroke(); });
  const jpgFieldName = player => {
    const parts = String(player[1] || '').trim().split(/\s+/).filter(Boolean);
    const surname = parts.pop() || '', firstName = parts[0] || surname;
    const flags = ['C', 'VC'].filter(flag => player?._listFlags?.[flag]).join(', ');
    const name = surname ? `${firstName.charAt(0)}. ${surname}` : '';
    return flags ? `${name} (${flags})` : name;
  };
  const drawJpgUnderYearBadge = (player, centerX, baseline, textWidth) => {
    const year = player?._listFlags?.U ? String(player?._underDetail || '').replace(/\D/g, '').slice(0, 2) : '';
    if (!year) return;
    context.save(); context.font = 'bold 9px Arial';
    const width = context.measureText(year).width + 8, x = centerX + textWidth / 2 + 3, y = baseline - 11;
    context.fillStyle = '#dc2626'; context.fillRect(x, y, width, 13);
    context.fillStyle = '#fff'; context.textAlign = 'center'; context.fillText(year, x + width / 2, baseline - 2);
    context.restore();
  };
  const jpgIncomingSubstitute = (side, player) => {
    const key = `${player[0]} ${player[1]}`;
    const team = teams[side];
    const isChangeForPlayer = event => (event.type === 'swap' || event.label === 'Cambio') &&
      (event.outgoing === key || String(event.player || '').split(/→|â†’|Ã¢â€ â€™/)[0]?.trim() === key);
    // Il registro della squadra conserva il giocatore entrante esatto: ha priorità
    // sugli elementi visivi delle tabelle, che possono avere indici diversi dopo un cambio.
    const change = (team.eventLog || []).find(isChangeForPlayer) ||
      [...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || [])].find(isChangeForPlayer);
    const incoming = change?.incoming || String(change?.player || '').split(/→|â†’|Ã¢â€ â€™/)[1]?.trim() || '';
    if (!incoming) return null;
    const incomingNumber = String(change?.incomingNumber || (String(incoming).match(/^\s*(\d+)/) || [])[1] || '');
    const allPlayers = [...(team.players || []), ...(team.bench || [])];
    const incomingPlayer = allPlayers.find(item => incomingNumber && String(item[0]) === incomingNumber) ||
      allPlayers.find(item => `${item[0]} ${item[1]}` === incoming || String(item[1] || '') === incoming.replace(/^\d+\s+/, ''));
    const savedYear = String(change?.incomingUnderYear || '').replace(/\D/g, '').slice(0, 2);
    if (incomingPlayer) {
      const selectedYear = incomingPlayer?._listFlags?.U
        ? String(incomingPlayer._underDetail || '').replace(/\D/g, '').slice(0, 2)
        : savedYear;
      const playerForExport = {
        ...incomingPlayer,
        _listFlags: { ...(incomingPlayer._listFlags || {}), U: Boolean(selectedYear) },
        _underDetail: selectedYear
      };
      return { label: jpgFieldName(incomingPlayer), player: playerForExport };
    }
    const parts = incoming.replace(/^\d+\s+/, '').trim().split(/\s+/).filter(Boolean);
    const surname = parts.pop() || '', firstName = parts[0] || surname;
    const fallbackPlayer = savedYear ? { _listFlags: { U: true }, _underDetail: savedYear } : null;
    return { label: surname ? `${firstName.charAt(0)}. ${surname}` : '', player: fallbackPlayer };
  };
  const jpgIncomingEventIcons = (side, player) => {
    const key = `${player[0]} ${player[1]}`;
    const team = teams[side];
    const events = [...(team.eventLog || []), ...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || []), ...(team._cardEvents || [])];
    const change = events.find(event => (event.type === 'swap' || event.label === 'Cambio') && (event.outgoing === key || String(event.player || '').split(/→|â†’|Ã¢â€ â€™/)[0]?.trim() === key));
    const incoming = change?.incoming || String(change?.player || '').split(/→|â†’|Ã¢â€ â€™/)[1]?.trim() || '';
    if (!incoming) return [];
    const incomingPlayer = [...(team.players || []), ...(team.bench || [])].find(item => `${item[0]} ${item[1]}` === incoming);
    const icons = events.filter(event => event.player === incoming && event.type !== 'swap' && !['Cambio', 'Esce', 'Entra'].includes(event.label))
      .map(event => ({ icon: event.icon, minute: event.minute || '' }));
    (incomingPlayer?._visibleEventMinutes || []).forEach(event => icons.push({ icon: event.icon, minute: event.minute || '' }));
    return icons.filter(event => event.icon && !['→', '←', 'â†’', 'â†'].includes(event.icon))
      .filter((event, index, list) => list.findIndex(item => `${item.icon}|${item.minute}` === `${event.icon}|${event.minute}`) === index)
      .map(event => event.icon);
  };
  for (const side of visibleSides) {
    const team = teams[side];
    (team.players || []).forEach((player, index) => {
      const point = fieldPosition(side, index);
      const playerX = fieldX + point[0] / 100 * fieldWidth;
      const playerY = headerHeight + point[1] / 100 * fieldHeight;
      const shirt = drawPdfShirt(context, playerX, playerY, team, player, .9);
      context.textAlign = 'center'; context.font = 'bold 22px Arial'; context.fillStyle = shirt.numberColor;
      context.fillText(String(player[0] || ''), playerX, playerY + 7);
      context.font = 'bold 13px Arial'; context.fillStyle = '#111';
      const jpgPlayerLabel = jpgFieldName(player); context.fillText(jpgPlayerLabel, playerX, playerY + 52, 135); drawJpgUnderYearBadge(player, playerX, playerY + 52, context.measureText(jpgPlayerLabel).width);
      playerEvents(side, player).forEach((event, eventIndex) => {
        context.textAlign = 'left'; context.font = (event.symbol === '→' || event.symbol === '←' || event.symbol === 'â†’' || event.symbol === 'â†') ? 'bold 17px Arial' : '15px Arial';
        context.fillStyle = event.color || '#111';
        context.fillText(event.symbol, playerX + 31, playerY - 18 + eventIndex * 17);
      });
      const incoming = jpgIncomingSubstitute(side, player);
      if (incoming?.label) {
        context.textAlign = 'center'; context.font = 'bold 11px Arial'; context.fillStyle = '#111';
        const jpgIncomingLabel = `(${incoming.label})`; context.fillText(jpgIncomingLabel, playerX, playerY + 67, 135); drawJpgUnderYearBadge(incoming.player, playerX, playerY + 67, context.measureText(jpgIncomingLabel).width);
        context.save();
        context.strokeStyle = '#fff'; context.fillStyle = '#fff'; context.lineWidth = 3;
        context.beginPath(); context.moveTo(playerX + 12, playerY + 81); context.lineTo(playerX - 10, playerY + 81); context.stroke();
        context.beginPath(); context.moveTo(playerX - 10, playerY + 81); context.lineTo(playerX - 3, playerY + 75); context.lineTo(playerX - 3, playerY + 87); context.closePath(); context.fill();
        context.restore();
      }
      const incomingIcons = jpgIncomingEventIcons(side, player);
      if (incomingIcons.length) {
        context.font = '15px Arial'; context.fillStyle = '#111';
        const spacing = 19, startX = playerX - (incomingIcons.length - 1) * spacing / 2;
        incomingIcons.forEach((icon, iconIndex) => context.fillText(icon, startX + iconIndex * spacing, playerY + 101));
      }
    });
  }
  context.textAlign = 'center'; context.font = 'bold 22px Arial'; context.fillStyle = '#111';
  if (visibleSide('home')) context.fillText(`MODULO ${teams.home.formation || '4-3-3'}`, fieldX + fieldWidth / 4, headerHeight + fieldHeight + 27);
  if (visibleSide('away')) context.fillText(`MODULO ${teams.away.formation || '4-3-3'}`, fieldX + fieldWidth * 3 / 4, headerHeight + fieldHeight + 27);

  const normalizedMinute = value => String(value ?? '').replace(/['’]/g, '').replace(/\s+/g, '');
  const minuteSortValue = value => {
    const [base, recovery] = normalizedMinute(value).split('+').map(Number);
    return Number.isFinite(base) ? base + (Number.isFinite(recovery) ? recovery / 100 : 0) : 999;
  };
  const recordedEventMinute = (side, event) => {
    if (event.minute !== undefined && event.minute !== null && event.minute !== '') return normalizedMinute(event.minute);
    const iconByLabel = { Gol: '⚽', Ammonito: '🟨', Espulso: '🟥' };
    const wantedIcon = event.icon || iconByLabel[event.label];
    const allPlayers = [...(teams[side].players || []), ...(teams[side].bench || [])];
    const playerIndex = allPlayers.findIndex(item => `${item[0]} ${item[1]}` === event.player);
    const player = allPlayers[playerIndex];
    const recorded = player?._visibleEventMinutes || [];
    const stored = [...recorded].reverse().find(item => item.icon === wantedIcon)?.minute;
    if (stored) return stored;
    const playerRow = playerIndex < 0 ? null : document.querySelectorAll(`#${side}Panel .player-list .player-row, #${side}Panel .bench-list .player-row`)[playerIndex];
    const visibleMinute = playerRow?.querySelector('.player-event')?.dataset.minute
      || [...(playerRow?.querySelectorAll('.visible-minute-label, .player-event-minute, .player-minute, .swap-minute, .player-event-entry small') || [])]
        .map(item => item.textContent.match(/\d+(?:\+\d+)?/)?.[0]).find(Boolean);
    return normalizedMinute(visibleMinute);
  };
  const eventRows = side => {
    const recordedCards = [...(teams[side].players || []), ...(teams[side].bench || [])].flatMap(player =>
      (player._visibleEventMinutes || [])
        .filter(item => item.icon === '🟨' || item.icon === '🟥')
        .map(item => ({ icon: item.icon, label: item.icon === '🟨' ? 'Ammonito' : 'Espulso', player: `${player[0]} ${player[1]}`, minute: item.minute || '' }))
    );
    const raw = [...(teams[side].eventLog || []), ...(window.selectedTableEvents?.[side] || []), ...(window.tableSwapEvents?.[side] || []), ...(teams[side]._cardEvents || []), ...recordedCards];
    const unique = [];
    raw.forEach(event => {
      const minute = recordedEventMinute(side, event);
      const key = [event.type, event.label, event.icon, event.player, event.outgoing, event.incoming, minute, event.assist].join('|');
      if (!unique.some(item => item.key === key)) unique.push({ ...event, minute, key });
    });
    return unique.sort((a, b) => (minuteSortValue(a.minute) - minuteSortValue(b.minute)) || Number(a.order || 0) - Number(b.order || 0));
  };
  const drawEventTable = (side, tableX) => {
    const rows = eventRows(side), tableWidth = fieldWidth / 2, tableY = headerHeight + fieldHeight + 32, rowHeight = 31;
    context.fillStyle = '#fff'; context.fillRect(tableX, tableY, tableWidth, 68);
    const teamLogo = side === 'home' ? homeLogo : awayLogo;
    if (teamLogo?.naturalWidth) {
      const ratio = teamLogo.naturalWidth / teamLogo.naturalHeight;
      const size = 42;
      const logoWidth = ratio >= 1 ? size : size * ratio;
      const logoHeight = ratio >= 1 ? size / ratio : size;
      context.drawImage(teamLogo, tableX + tableWidth / 2 - logoWidth / 2, tableY + 4, logoWidth, logoHeight);
    }
    const columnsY = tableY + 50;
    context.fillStyle = '#dce8ed'; context.fillRect(tableX, columnsY, tableWidth, 24);
    context.textAlign = 'center'; context.font = 'bold 12px Arial'; context.fillStyle = '#17394c';
    context.fillText('MIN.', tableX + 25, columnsY + 16);
    context.fillText('ICONA', tableX + 60, columnsY + 16);
    context.fillText('GIOCATORE', tableX + 170, columnsY + 16);
    context.fillText('EVENTO', tableX + 390, columnsY + 16);
    const renderRows = rows.length ? rows : [{ empty: true }];
    renderRows.forEach((event, index) => {
      const rowY = columnsY + 24 + index * rowHeight;
      context.fillStyle = index % 2 ? '#eef4f7' : '#fff'; context.fillRect(tableX, rowY, tableWidth, rowHeight);
      context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(tableX, rowY, tableWidth, rowHeight);
      if (event.empty) return;
      const change = event.type === 'swap' || event.label === 'Cambio';
      const minute = event.minute ? `${event.minute}'` : '';
      context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = '#111'; context.fillText(minute, tableX + 25, rowY + 20);
      if (change) {
        const [outgoing = event.outgoing || '', incoming = event.incoming || ''] = String(event.player || '').split(/→|â†’/).map(value => value.trim());
        context.textAlign = 'left'; context.font = 'bold 16px Arial'; context.fillStyle = '#ef4444'; context.fillText('→', tableX + 48, rowY + 21);
        context.font = '13px Arial'; context.fillStyle = '#111'; context.fillText(event.outgoing || outgoing, tableX + 70, rowY + 20, 165);
        context.font = 'bold 16px Arial'; context.fillStyle = '#15803d'; context.fillText('←', tableX + 240, rowY + 21);
        context.font = '13px Arial'; context.fillStyle = '#111'; context.fillText(event.incoming || incoming, tableX + 262, rowY + 20, 235);
        return;
      }
      context.textAlign = 'center'; context.font = '15px Arial'; context.fillStyle = '#111'; context.fillText(event.icon || '', tableX + 58, rowY + 21);
      context.textAlign = 'left'; context.font = '13px Arial'; context.fillStyle = '#111'; context.fillText(event.player || '', tableX + 82, rowY + 20, 180);
      const detail = `${event.label || 'Evento'}${event.assist ? ` · Assist: ${event.assist}` : ''}${event.reason ? ` · ${event.reason}` : ''}`;
      context.fillText(detail, tableX + 270, rowY + 20, 230);
    });
  };
  const splitChangeForTable = event => {
    const parts = String(event.player || '').split(/→|←|â†’|â†|Ã¢â€ â€™/).map(value => value.trim()).filter(Boolean);
    return { outgoing: event.outgoing || parts[0] || '', incoming: event.incoming || parts[1] || '' };
  };
  const drawEventCategories = (side, tableX, sharedRows) => {
    const tableWidth = (fieldWidth - 20) / 2, tableY = headerHeight + fieldHeight + 54, rowHeight = 31;
    const allRows = eventRows(side);
    const goalRows = allRows.filter(item => item.label === 'Gol' || item.type === 'goal').map(goal => {
      const linkedAssist = allRows.find(item => item.label === 'Assist' && String(item.minute || '') === String(goal.minute || ''));
      return { ...goal, assist: goal.assist || linkedAssist?.player || '' };
    });
    const sections = [
      { icon: '⚽', title: 'Gol e assist', columns: ['MIN.', 'GOL', 'ASSIST'], rows: goalRows, type: 'goal' },
      { icon: '🟨', title: 'Cartellini gialli', columns: ['MIN.', 'GIOCATORE', 'MOTIVO'], rows: allRows.filter(item => item.label === 'Ammonito' || item.type === 'yellow'), type: 'card' },
      { icon: '🟥', title: 'Cartellini rossi', columns: ['MIN.', 'GIOCATORE', 'MOTIVO'], rows: allRows.filter(item => item.label === 'Espulso' || item.type === 'red'), type: 'card' },
      { icon: '⇄', title: 'Cambi', columns: ['MIN.', 'ESCE', 'ENTRA'], rows: allRows.filter(item => item.type === 'swap' || item.label === 'Cambio'), type: 'swap' }
    ];
    context.fillStyle = '#fff'; context.fillRect(tableX, tableY, tableWidth, 68);
    const teamLogo = side === 'home' ? homeLogo : awayLogo;
    if (teamLogo?.naturalWidth) {
      const ratio = teamLogo.naturalWidth / teamLogo.naturalHeight, size = 60;
      const logoWidth = ratio >= 1 ? size : size * ratio, logoHeight = ratio >= 1 ? size / ratio : size;
      context.drawImage(teamLogo, tableX + tableWidth / 2 - logoWidth / 2, tableY + 4, logoWidth, logoHeight);
    }
    let currentY = tableY + 68;
    sections.forEach((section, sectionIndex) => {
      const rows = [...section.rows];
      const rowCount = Math.max(1, sharedRows?.[sectionIndex] || 1);
      while (rows.length < rowCount) rows.push({ empty: true });
      context.fillStyle = '#163b50'; context.fillRect(tableX, currentY, tableWidth, 26);
      context.textAlign = 'left'; context.font = '16px Arial'; context.fillStyle = '#fff'; context.fillText(section.icon, tableX + 10, currentY + 19);
      context.font = 'bold 14px Arial'; context.fillText(section.title, tableX + 48, currentY + 18);
      const headerY = currentY + 26;
      context.fillStyle = '#dce8ed'; context.fillRect(tableX, headerY, tableWidth, 22);
      const positions = section.type === 'card' ? [45, 200, 412] : section.type === 'swap' ? [45, 185, 407] : [45, 167, 390];
      context.textAlign = 'center'; context.font = 'bold 11px Arial'; context.fillStyle = '#17394c';
      section.columns.forEach((column, index) => context.fillText(column, tableX + positions[index], headerY + 15));
      rows.forEach((item, index) => {
        const rowY = headerY + 22 + index * rowHeight;
        context.fillStyle = index % 2 ? '#eef4f7' : '#fff'; context.fillRect(tableX, rowY, tableWidth, rowHeight);
        context.strokeStyle = '#b9cbd4'; context.lineWidth = 1; context.strokeRect(tableX, rowY, tableWidth, rowHeight);
        if (item.empty) return;
        const minute = item.minute ? `${item.minute}'` : '';
        if (section.type === 'goal') {
          context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = '#111'; context.fillText(minute, tableX + 45, rowY + 20);
          context.textAlign = 'center'; context.font = '13px Arial'; context.fillText(item.player || item.scorer || '', tableX + 167, rowY + 20, 185);
          if (item.assist) context.fillText(item.assist, tableX + 390, rowY + 20, 205);
        } else if (section.type === 'card') {
          context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = '#111'; context.fillText(minute, tableX + 45, rowY + 20);
          context.textAlign = 'center'; context.font = '13px Arial'; context.fillText(item.player || item.scorer || '', tableX + 200, rowY + 20, 220);
          context.fillText(item.reason || '', tableX + 412, rowY + 20, 160);
        } else {
          const change = splitChangeForTable(item);
          context.textAlign = 'center'; context.font = 'bold 13px Arial'; context.fillStyle = '#111'; context.fillText(minute, tableX + 45, rowY + 20);
          context.textAlign = 'center'; context.font = 'bold 16px Arial'; context.fillStyle = '#ef4444'; context.fillText('→', tableX + 118, rowY + 21);
          context.font = '13px Arial'; context.fillStyle = '#111'; context.fillText(change.outgoing, tableX + 190, rowY + 20, 150);
          context.font = 'bold 16px Arial'; context.fillStyle = '#15803d'; context.fillText('←', tableX + 340, rowY + 21);
          context.font = '13px Arial'; context.fillStyle = '#111'; context.fillText(change.incoming, tableX + 407, rowY + 20, 170);
        }
      });
      currentY += 48 + rows.length * rowHeight + (sectionIndex < sections.length - 1 ? 10 : 0);
    });
    return currentY;
  };
  const eventTableWidth = (fieldWidth - 20) / 2;
  const sectionMatchers = [
    event => event.label === 'Gol' || event.type === 'goal',
    event => event.label === 'Ammonito' || event.type === 'yellow',
    event => event.label === 'Espulso' || event.type === 'red',
    event => event.type === 'swap' || event.label === 'Cambio'
  ];
  const sharedRows = sectionMatchers.map(match => Math.max(1, ...visibleSides.map(side => eventRows(side).filter(match).length)));
  const homeTablesBottom = visibleSide('home') ? drawEventCategories('home', lineup === 'home' ? fieldX + eventTableWidth / 2 + 10 : fieldX, sharedRows) : 0;
  const awayTablesBottom = visibleSide('away') ? drawEventCategories('away', lineup === 'away' ? fieldX + eventTableWidth / 2 + 10 : fieldX + eventTableWidth + 20, sharedRows) : 0;
  context.textAlign = 'center'; context.font = 'bold 12px Arial'; context.fillStyle = '#17394c';
  context.fillText('LEGENDA CARTELLINI:  F: Fallo  ·  FM: Fallo Mano  ·  P: Proteste  ·  AS: Anti Sportivo  ·  R: Reazione  ·  DG: Doppio Giallo', fieldX + fieldWidth / 2, Math.max(homeTablesBottom, awayTablesBottom) + 22);
  const jpgContentBottom = Math.max(homeTablesBottom, awayTablesBottom) + 42;
  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = canvas.width;
  croppedCanvas.height = Math.min(canvas.height, Math.ceil(jpgContentBottom));
  croppedCanvas.getContext('2d').drawImage(canvas, 0, 0);
  return croppedCanvas;
}

document.addEventListener('click', async event => {
  if (!event.target.closest('#jpgBtn')) return;
  try {
    const picker = window.showSaveFilePicker?.({
      suggestedName: 'campo-calcio.jpg',
      types: [{ description: 'Immagine JPG', accept: { 'image/jpeg': ['.jpg', '.jpeg'] } }]
    });
    const canvas = await createCleanPitchJpg();
    const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('JPG non creato')), 'image/jpeg', 0.94));
    if (picker) {
      const handle = await picker;
      const file = await handle.createWritable();
      await file.write(blob);
      await file.close();
      return;
    }
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'campo-calcio.jpg';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  } catch (error) {
    if (error?.name !== 'AbortError') alert('Impossibile scaricare il JPG.');
  }
});
