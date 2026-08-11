(() => {
  const button = document.querySelector('#bugReportBtn');
  if (!button) return;

  button.addEventListener('click', () => {
    window.location.href = 'mailto:info@matchanalystlab.it?subject=' + encodeURIComponent('SEGNALAZIONE BUG');
  });
})();
