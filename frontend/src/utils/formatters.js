export function formatDate(dateStr) {
  if (!dateStr) return '-'
  const [y, m, d] = String(dateStr).slice(0, 10).split('-')
  return `${d}/${m}/${y}`
}
