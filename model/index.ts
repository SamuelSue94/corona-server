import mysql = require("mysql")
const mysqlConfig = require('../config/db.config')

const pool = mysql.createPool(mysqlConfig)

function execute(sql:string,params?:any[]):Promise<any> {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err)
      connection.query(sql,params,((err1, results,fields) => {
        if(err1) reject(err1)
        resolve(results)
        connection.release()
      }))
    })
  })
}

export {execute}
