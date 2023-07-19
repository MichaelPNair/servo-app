export function fetchStations() {
  return fetch(`/api/stations/all`)
  .then(res => res.json())
}

export function fetchStats() {
  return fetch(`/api/stats`)
  .then(res => res.json())
}

export function fetchNearestStations(lat, lng){
  return fetch(`/api/stations/nearest?lat=${lat}&lng=${lng}&radius=50000`)
  .then(res => res.json())
}