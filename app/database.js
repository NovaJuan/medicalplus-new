const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

async function startDB() {
  const db = await sqlite.open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database,
  });

  await db.run(`CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            docid TEXT NOT NULL,
            sex INTEGER NOT NULL,
            borndate TEXT NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            height INTEGER NOT NULL,
            phones TEXT NOT NULL,
            emails TEXT NOT NULL,
            address TEXT NOT NULL,
            insurance TEXT,
            story TEXT NOT NULL,
            image TEXT,
            created_at INTEGER NOT NULL,
            last_update INTEGER NOT NULL
          )`);

  await db.run(`CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY,
            patient INTEGER NOT NULL,
            date INTEGER NOT NULL,
            created_at INTEGER NOT NULL,
            FOREIGN KEY(patient) REFERENCES patients(id)
        )`);

  return db;
}

module.exports = startDB;
