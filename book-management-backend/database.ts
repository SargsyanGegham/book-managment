import Database from "better-sqlite3";

const db = new Database("books.db", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL
  )
`);

export default db;
