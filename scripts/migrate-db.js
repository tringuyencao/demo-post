const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");

require("dotenv").config({ path: envPath });

const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
});

async function query(q) {
  try {
    const results = db.query(q);
    await db.end();
    return results;
  } catch (error) {
    throw Error(e.message);
  }
}

//create table
async function migrate() {
  try {
    await query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(36) PRIMARY KEY,
          email TEXT NOT NULL,
          hash TEXT NOT NULL,
          salt TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at 
            TIMESTAMP 
            NOT NULL 
            DEFAULT CURRENT_TIMESTAMP 
            ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    await query(`
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          user_id VARCHAR(36) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at 
            TIMESTAMP 
            NOT NULL 
            DEFAULT CURRENT_TIMESTAMP 
            ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
    console.log("migration ran successfully");
  } catch (e) {
    console.error("could not run migration, double check your credentials.");
    process.exit(1);
  }
}

migrate().then(() => process.exit());
