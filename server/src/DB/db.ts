import dotenv = require("dotenv")
dotenv.config()

import mysql = require("mysql")

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT)
})

connection.connect((err: any) => {
  if (err) {
    connection.end()
  }
})

export default connection