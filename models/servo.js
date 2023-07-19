const db = require('../db')

function findAll() {
  const sql = `
    SELECT *
    FROM stations
    ORDER BY id
    LIMIT 400;
    `
  return db.query(sql)
    .then(res => res.rows)
}

function findOwner() {
  const sql = `
    SELECT DISTINCT owner 
    FROM stations;
    `
  return db.query(sql)
    .then(res => res.rows)
}

function randomStation() {
  const sql = `
    SELECT *
    FROM stations
    ORDER BY RANDOM()
    LIMIT 1;
    `
  return db.query(sql)
    .then(res => res.rows[0])
}

function countOwner() {
  const sql = `
    SELECT owner, 
    COUNT (*) as total
    FROM stations
    GROUP BY owner
    HAVING COUNT(*) > 1
    ORDER BY total desc;
    `
  return db.query(sql)
    .then(res => res.rows)
}

function totalOwners() {
  const sql = `
    SELECT COUNT(DISTINCT owner) as total_owners
    FROM stations;
    `
  return db.query(sql)
    .then(res => res.rows[0])
}

function totalStations() {
  const sql = `
    SELECT COUNT(id) as total_stations
    FROM stations;
    `
  return db.query(sql)
    .then(res => res.rows[0])
}

function getStats() {

  return Promise.all([countOwner(), totalOwners(), totalStations()]).then((values) => {
    return { owners: values[0], total_owners: values[1].total_owners, total_stations: values[2].total_stations }

  })

}

function getAllBoundStations(coordinates) {
  let lat1 = Number(coordinates[0])
  let lng1 = Number(coordinates[1])
  let lat2 = Number(coordinates[2])
  let lng2 = Number(coordinates[3])

  let sqlCoordinates = []

    if(lat1 < lat2){
      sqlCoordinates.push(lat1)
      sqlCoordinates.push(lat2)
    } else {
      sqlCoordinates.push(lat2)
      sqlCoordinates.push(lat1)
    }
    if(lng1 < lng2){
      sqlCoordinates.push(lng1)
      sqlCoordinates.push(lng2)
    } else {
      sqlCoordinates.push(lng2)
      sqlCoordinates.push(lng1)
    }

    const sql = 
    `SELECT * FROM stations
    WHERE latitude > $1
    AND latitude < $2 AND longitude >
    $3 AND longitude < $4;
    `
  return db.query(sql, sqlCoordinates)
    .then(res => res.rows)
}

const Station = {
  findAll,
  findOwner,
  randomStation,
  countOwner,
  totalOwners,
  totalStations,
  getAllBoundStations,
  getStats
}

module.exports = Station