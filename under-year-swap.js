(() => {
  const previousMergeSwapEvent = mergeSwapEvent;
  mergeSwapEvent = (side, outIndex, inIndex, minute) => {
    const outgoing = teams[side]?.players?.[outIndex];
    const incoming = teams[side]?.bench?.[inIndex];
    const outgoingKey = outgoing ? `${outgoing[0]} ${outgoing[1]}` : '';
    const incomingKey = incoming ? `${incoming[0]} ${incoming[1]}` : '';
    const incomingUnderYear = incoming?._listFlags?.U
      ? String(incoming._underDetail || '').replace(/\D/g, '').slice(0, 2)
      : '';
    const result = previousMergeSwapEvent(side, outIndex, inIndex, minute);
    if (incomingKey) {
      const event = [...(teams[side]?.eventLog || [])].reverse().find(item =>
        item.type === 'swap' && item.outgoing === outgoingKey && item.incoming === incomingKey
      );
      if (event) {
        event.incomingNumber = String(incoming[0] ?? '');
        event.incomingName = String(incoming[1] ?? '');
        event.incomingUnderYear = incomingUnderYear;
      }
    }
    return result;
  };
})();
