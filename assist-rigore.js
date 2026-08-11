(() => {
  const originalSelectAssistForGoal = selectAssistForGoal;
  selectAssistForGoal = function(side) {
    originalSelectAssistForGoal(side);
    const button = document.querySelector('#assistPlayerModal [data-no-assist]');
    if (!button) return;
    button.textContent = '— Nessun assist —';
    const penalty = document.createElement('button');
    penalty.type = 'button';
    penalty.className = 'special-choice penalty-choice';
    penalty.textContent = 'Rigore';
    penalty.onclick = () => {
      button.click();
      const setPenalty = items => {
        const goal = [...(items || [])].reverse().find(event => event.label === 'Gol');
        if (goal) goal.assist = 'Rigore';
      };
      setPenalty(teams[side].eventLog);
      setPenalty(window.selectedTableEvents?.[side]);
    };
    button.after(penalty);
  };
})();
