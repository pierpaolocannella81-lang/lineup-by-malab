(() => {
  const styles = ['quartered', 'chest', 'top-band', 'bottom-band', 'argyle', 'diamonds', 'cuffs', 'flames', 'wave', 'stripes-left', 'stripes-right', 'halves-horizontal'];
  const pattern = (style, one, two, three) => ({
    band: `linear-gradient(${one} 0 32%,${two} 32% 55%,${one} 55%)`,
    cross: `linear-gradient(90deg,transparent 42%,${two} 42% 58%,transparent 58%),linear-gradient(${one} 0 38%,${two} 38% 55%,${one} 55%)`,
    center: `linear-gradient(90deg,${one} 0 36%,${two} 36% 64%,${one} 64%)`,
    hoops: `repeating-linear-gradient(0deg,${one} 0 8px,${two} 8px 16px,${three} 16px 24px)`,
    half: `linear-gradient(${one} 0 52%,${two} 52%)`,
    split: `linear-gradient(90deg,${one} 0 50%,${two} 50%)`,
    vertical: `repeating-linear-gradient(90deg,${one} 0 9px,${two} 9px 18px,${three} 18px 27px)`,
    sleeves: `linear-gradient(90deg,${two} 0 22%,${one} 22% 78%,${two} 78%)`,
    diagonal: `repeating-linear-gradient(135deg,${one} 0 10px,${two} 10px 20px)`,
    sash: `linear-gradient(135deg,${one} 0 42%,${two} 42% 58%,${one} 58%)`,
    chevron: `linear-gradient(135deg,transparent 46%,${two} 47% 54%,transparent 55%),linear-gradient(45deg,transparent 46%,${two} 47% 54%,transparent 55%),${one}`,
    dots: `radial-gradient(${three} 18%,transparent 20%) 0 0/12px 12px,${one}`,
    wide: `repeating-linear-gradient(90deg,${one} 0 16px,${two} 16px 31px)`,
    shoulders: `linear-gradient(155deg,${two} 0 22%,transparent 22%),linear-gradient(205deg,${two} 0 22%,transparent 22%),${one}`,
    pinstripe: `repeating-linear-gradient(90deg,${one} 0 6px,${two} 6px 8px)`,
    checker: `conic-gradient(${two} 25%,${one} 0 50%,${two} 0 75%,${one} 0) 0/18px 18px`,
    'thin-hoops': `repeating-linear-gradient(0deg,${one} 0 5px,${two} 5px 8px,${three} 8px 11px)`,
    thirds: `linear-gradient(90deg,${one} 0 33%,${two} 33% 66%,${three} 66%)`,
    'double-band': `linear-gradient(${one} 0 22%,${two} 22% 34%,${one} 34% 58%,${two} 58% 70%,${one} 70%)`,
    frame: `linear-gradient(90deg,${two} 0 12%,${one} 12% 88%,${two} 88%),linear-gradient(${two} 0 14%,transparent 14% 86%,${two} 86%)`,
    zigzag: `linear-gradient(135deg,${two} 25%,transparent 25%) -10px 0/20px 20px,linear-gradient(225deg,${two} 25%,transparent 25%) -10px 0/20px 20px,${one}`,
    gradient: `linear-gradient(${two},${one})`,
    offset: `linear-gradient(115deg,${one} 0 42%,${two} 42% 58%,${one} 58%)`,
    blocks: `linear-gradient(90deg,${two} 0 33%,transparent 33% 66%,${two} 66%),linear-gradient(${one} 0 50%,${two} 50%)`,
    left: `linear-gradient(90deg,${two} 0 28%,${one} 28%)`,
    right: `linear-gradient(90deg,${one} 0 72%,${two} 72%)`,
    collar: `linear-gradient(135deg,transparent 44%,${two} 45% 55%,transparent 56%),${one}`,
    vneck: `linear-gradient(135deg,transparent 45%,${two} 46% 54%,transparent 55%),linear-gradient(225deg,transparent 45%,${two} 46% 54%,transparent 55%),${one}`,
    fade: `linear-gradient(${two},${one} 70%)`,
    stars: `radial-gradient(${three} 18%,transparent 20%) 0 0/14px 14px,radial-gradient(${three} 18%,transparent 20%) 7px 7px/14px 14px,${one}`,
    grid: `linear-gradient(${two} 1px,transparent 1px) 0 0/10px 10px,linear-gradient(90deg,${two} 1px,transparent 1px) 0 0/10px 10px,${one}`,
    rays: `repeating-conic-gradient(from 180deg at 50% 0,${two} 0 12deg,${one} 12deg 24deg)`,
    quartered: `linear-gradient(90deg,${one} 0 50%,${two} 50%),linear-gradient(${one} 0 50%,${two} 50%)`,
    chest: `linear-gradient(${one} 0 20%,${two} 20% 40%,${one} 40%)`,
    'top-band': `linear-gradient(${two} 0 24%,${one} 24%)`,
    'bottom-band': `linear-gradient(${one} 0 76%,${two} 76%)`,
    argyle: `linear-gradient(135deg,transparent 42%,${two} 43% 57%,transparent 58%),linear-gradient(45deg,transparent 42%,${two} 43% 57%,transparent 58%),${one}`,
    diamonds: `conic-gradient(from 45deg,${two} 25%,${one} 0 50%,${three} 0 75%,${one} 0) 0/18px 18px`,
    cuffs: `linear-gradient(90deg,${two} 0 18%,${one} 18% 82%,${two} 82%),linear-gradient(${one} 0 78%,${three} 78%)`,
    flames: `linear-gradient(145deg,${two} 0 13%,transparent 13% 25%,${two} 25% 38%,transparent 38% 50%,${two} 50% 63%,transparent 63%),${one}`,
    wave: `repeating-radial-gradient(ellipse at 50% 0,${two} 0 8px,${one} 9px 17px)`,
    'stripes-left': `repeating-linear-gradient(115deg,${two} 0 8px,${one} 8px 20px)`,
    'stripes-right': `repeating-linear-gradient(65deg,${two} 0 8px,${one} 8px 20px)`,
    'halves-horizontal': `linear-gradient(${one} 0 33%,${two} 33% 66%,${three} 66%)`
  })[style];

  const apply = () => {
    for (const side of ['home', 'away']) document.querySelectorAll(`.token.${side}`).forEach(token => {
      const player = teams[side].players[token.dataset.index];
      const keeper = String(player?.[2] || '').toUpperCase() === 'POR';
      const prefix = keeper ? 'keeper' : 'player';
      const style = teams[side][`${prefix}ShirtStyle`] || 'solid';
      if (style === 'solid' || teams[side][`${prefix}Image`]) return;
      const one = teams[side][`${prefix}Color1`] || (keeper ? '#facc15' : teams[side].kit || '#e53935');
      const two = teams[side][`${prefix}Color2`] || '#ffffff';
      const three = teams[side][`${prefix}Color3`] || '#111111';
      const background = pattern(style, one, two, three);
      if (background) token.style.backgroundImage = background;
    });
  };

  const addButtons = () => document.querySelectorAll('.keeper-style-options').forEach(options => {
    if (options.dataset.extraStylesReady) return;
    const panel = options.closest('.team-panel');
    const side = panel?.id?.replace('Panel', '');
    if (!side || !teams[side]) return;
    const keeper = Boolean(options.querySelector('[data-keeper-style]'));
    const controls = options.querySelector('.keeper-color-controls');
    styles.forEach(style => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `kit-preview kit-preview-${style}`;
      button.dataset.style = style;
      button.title = style;
      button.innerHTML = '<i></i>';
      button.onclick = () => {
        teams[side][keeper ? 'keeperShirtStyle' : 'playerShirtStyle'] = style;
        options.querySelectorAll('.kit-preview').forEach(item => item.classList.toggle('selected', item === button));
        options.closest('.keeper-shirt-style')?.classList.remove('open');
        buildTokens();
      };
      controls ? options.insertBefore(button, controls) : options.append(button);
    });
    options.dataset.extraStylesReady = 'true';
  });

  setTimeout(() => {
    const previousBuildTokens = buildTokens;
    buildTokens = function () { previousBuildTokens(); apply(); };
    addButtons();
    apply();
    new MutationObserver(() => { addButtons(); apply(); }).observe(document.body, { childList: true, subtree: true });
  }, 0);
})();
