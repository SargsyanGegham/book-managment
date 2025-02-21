import { Router, Request, Response } from "express";
import db from "../database";

const router = Router();

// Type for request body
interface BookRequestBody {
  title: string;
  author: string;
  isbn: string;
}

// Add a new book
router.post("/", (req: Request, res: Response) => {
  const { title, author, isbn } = req.body as BookRequestBody;

  try {
    const stmt = db.prepare("INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)");
    const result = stmt.run(title, author, isbn);
    
    res.status(201).json({ id: result.lastInsertRowid, title, author, isbn });
  } catch (error) {
    res.status(400).json({ error: "Error adding book" });
  }
});

// Get a list of books with filtering and pagination
router.get("/", (req: Request, res: Response) => {
  const { title, author, isbn, page = "1", limit = "100" } = req.query;

  const offset = (Number(page) - 1) * Number(limit);
  let query = "SELECT * FROM books WHERE 1=1";
  const params: (string | number)[] = [];

  if (typeof title === "string") {
    query += " AND title LIKE ?";
    params.push(`%${title}%`);
  }
  if (typeof author === "string") {
    query += " AND author LIKE ?";
    params.push(`%${author}%`);
  }
  if (typeof isbn === "string") {
    query += " AND isbn LIKE ?";
    params.push(`%${isbn}%`);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), offset);

  try {
    const books = db.prepare(query).all(...params);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving books" });
  }
});

interface ParamsWithId {
  id: string;
}

// Update a book
router.put("/:id", (req: Request, res: Response) => {
  const { title, author, isbn } = req.body as BookRequestBody;
  const { id } = req.params;

  try {
    const stmt = db.prepare("UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?");
    const result = stmt.run(title, author, isbn, id);

    if (result.changes === 0) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json({ id, title, author, isbn });
  } catch (error) {
    res.status(400).json({ error: "Error updating book" });
  }
});

// Delete a book
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM books WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting book" });
  }
});

export default router;
