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
    return {owners: values[0], total_owners: values[1].total_owners, total_stations: values[2].total_stations} 

  })
  
}

const Station = {
    findAll,
    findOwner,
    randomStation,
    countOwner,
    totalOwners,
    totalStations,
    getStats
}

module.exports = Station