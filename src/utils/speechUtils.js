export function calculateWpm(wordCount, elapsedMs) {
  if (elapsedMs <= 0) return 0;
  return Math.round((wordCount / elapsedMs) * 60000);
}

export function getPaceFeedback(wpm) {
  if (wpm < 110) return { label: 'Too Slow', color: '#f59e0b', message: 'Try speaking a bit faster for better engagement.' };
  if (wpm > 190) return { label: 'Too Fast', color: '#ef4444', message: 'Slow down slightly for clearer delivery.' };
  return { label: 'Good Pace', color: '#10b981', message: 'Good speaking pace. Keep it natural.' };
}
