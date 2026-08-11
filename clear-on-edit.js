(() => {
  const selector = '#homeName,#awayName,[data-name],.name-surname-fields input,.match-day,.match-date,.venue-value-fixed,.official-value';
  const originals = new WeakMap();
  const isTextField = element => element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
  const read = element => isTextField(element) ? element.value : element.textContent;
  const write = (element, value) => {
    if (isTextField(element)) element.value = value;
    else element.textContent = value;
  };
  const notify = element => element.dispatchEvent(new Event('input', { bubbles: true }));

  document.addEventListener('focusin', event => {
    const element = event.target.closest?.(selector);
    if (!element || originals.has(element)) return;
    const value = read(element);
    originals.set(element, value);
    if (String(value).trim()) write(element, '');
  }, true);

  document.addEventListener('focusout', event => {
    const element = event.target.closest?.(selector);
    if (!element || !originals.has(element)) return;
    const original = originals.get(element);
    originals.delete(element);
    if (element.matches('.match-day') && !String(read(element)).trim()) {
      notify(element);
      return;
    }
    if (!String(read(element)).trim() && String(original).trim()) {
      write(element, original);
      notify(element);
    }
  }, true);
})();
