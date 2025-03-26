
require('dotenv').config();
const mysql = require('mysql');
 
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
 
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});
 
db.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL');
});
 
module.exports = db;
