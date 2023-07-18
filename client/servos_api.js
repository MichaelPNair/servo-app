export function fetchStations() {
  return fetch(`/api/stations/all`)
  .then(res => res.json())
}