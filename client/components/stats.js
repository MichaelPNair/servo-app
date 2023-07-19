import { fetchStats } from "../servos_api.js";
const statsSection = document.querySelector(".stats")

fetchStats()
  .then(renderStats)

function renderStats(stats) {
  const totalStation = stats.total_stations
  const totalOwners = stats.total_owners
  const owners = stats.owners

  const stationsEl = document.createElement("div")
  const ownersEl = document.createElement("div")
  stationsEl.classList.add("stats-total")
  ownersEl.classList.add("stats-total")

  stationsEl.textContent = `Total Stations: ${totalStation}`
  ownersEl.textContent = `Total Owners: ${totalOwners}`

  statsSection.appendChild(stationsEl)
  statsSection.appendChild(ownersEl)

  owners.forEach((owner, idx) => {
    const name = owner.owner
    const count = owner.total

    const row = document.createElement("div")
    row.classList.add("stats-row")
    if (idx % 2 === 0) {
      row.classList.add("even-row")
    }
    const nameOwner = document.createElement("div")
    nameOwner.classList.add("owner-table-row")
    const countOwner = document.createElement("div")
    countOwner.classList.add("count-table-row")

    nameOwner.textContent = name
    countOwner.textContent = count



    row.appendChild(nameOwner)
    row.appendChild(countOwner)
    statsSection.appendChild(row)

  })



}