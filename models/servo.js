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


const Station = {
    findAll,
    findOwner
}

module.exports = Station