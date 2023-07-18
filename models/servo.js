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

const Station = {
    findAll,
    findOwner,
    randomStation
}

module.exports = Station