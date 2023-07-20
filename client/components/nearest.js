import { fetchNearestStations } from "../servos_api.js";
const nearestSection = document.querySelector(".nearest");

export function displayNearestStations(lat, lng) {
  return fetchNearestStations(lat, lng)
    .then(renderStations)
}

// fetchNearestStations(-37.7981773, 144.9989004)
  // .then(renderStations)

function renderStations(stations) {
  const firstTenStations = stations.slice(0,10)
  // console.log(firstTenStations)
  firstTenStations.forEach(station => {
    const div = document.createElement("div")
    div.classList.add("stations")
    const logo = document.createElement("img")
    logo.classList.add("logo")
    const contentWrap = document.createElement("div")
    const topContent = document.createElement("div")
    topContent.classList.add("nearest-content")
    const bottomContent = document.createElement("div")
    bottomContent.classList.add("nearest-content")

    logo.src = station.logo_url
    topContent.innerHTML = `${station.name} <span class="distance">${Math.floor(station.distance_meters)}m</span>`
    bottomContent.innerHTML = station.address

    div.appendChild(logo)
    contentWrap.appendChild(topContent)
    contentWrap.appendChild(bottomContent)
    div.appendChild(contentWrap)
    nearestSection.appendChild(div)
  })
}