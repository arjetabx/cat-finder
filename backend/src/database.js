const path = require('node:path')
const Database = require('better-sqlite3')

// Create the database file inside backend/data.
const databasePath = path.join(
  __dirname,
  '..',
  'data',
  'catfinder.db',
)

const db = new Database(databasePath)

db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS cat_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    report_type TEXT NOT NULL
      CHECK (report_type IN ('lost', 'found', 'spotted')),

    cat_name TEXT,
    breed TEXT NOT NULL,
    sex TEXT NOT NULL DEFAULT 'unknown'
      CHECK (sex IN ('female', 'male', 'unknown')),

    colour TEXT NOT NULL,
    description TEXT NOT NULL,

    location TEXT NOT NULL,
    latitude REAL,
    longitude REAL,

    date_seen TEXT NOT NULL,
    photo_path TEXT,

    created_at TEXT NOT NULL DEFAULT (
      strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    )
  )
`)

module.exports = db