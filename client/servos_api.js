export function fetchStations() {
  return fetch(`/api/stations/all`)
  .then(res => res.json())
}

export function fetchStats() {
  return fetch(`/api/stats`)
  .then(res => res.json())
}