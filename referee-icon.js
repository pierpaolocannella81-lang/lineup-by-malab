function ensureOfficialFields() {
  const details = document.querySelector('.match-details');
  if (!details) return;
  const labels = ['Arbitro:', 'Assistente 1:', 'Assistente 2:'];
  let savedValues = [];
  try { savedValues = JSON.parse(localStorage.getItem('lavagnaCalcioAuto') || '{}')?.fields?.officials || []; } catch {}
  while (details.querySelectorAll('.official-detail').length < labels.length) {
    const index = details.querySelectorAll('.official-detail').length;
    const field = document.createElement('div');
    field.className = 'official-detail';
    field.innerHTML = `${labels[index]} <span class="official-value" contenteditable="true" spellcheck="false">${savedValues[index] || 'xxx x. (xx)'}</span>`;
    details.append(field);
  }
}

function addOfficialIcons() {
  ensureOfficialFields();
  document.querySelectorAll('.official-detail').forEach((official, index) => {
    if (official.querySelector('.official-icon')) return;
    const icon = document.createElement('img');
    icon.className = `official-icon ${index === 0 ? 'referee-whistle' : 'assistant-flags'}`;
    icon.src = index === 0 ? 'assets/referee-whistle.png' : 'assets/assistant-flags.png';
    icon.alt = '';
    official.prepend(icon);
  });
}

addOfficialIcons();
setTimeout(addOfficialIcons, 120);
setTimeout(addOfficialIcons, 350);
new MutationObserver(addOfficialIcons).observe(document.body, { childList: true, subtree: true });
