const { Pool } = require('pg')
// Connection URL. This is where your mongodb server is running.
// set env variables in .env
// require('dotenv').config()

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: connectionString,
  ssl:true,
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
