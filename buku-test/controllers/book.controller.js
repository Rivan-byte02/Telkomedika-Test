import { pool } from '../db.js'

const ok = (data) => ({
  status: 'success',
  data
})

export async function listBooks(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT id, title, author, year FROM book ORDER BY id DESC");
    res.json(ok(rows))
  } catch (error) {
    next(error)
  }
}

export async function getBook(req, res, next) {
  try {
    const id = Number(req.params.id)
    const [rows] = await pool.query("SELECT id, title, author, year FROM book WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found'});
    }
    res.json(ok(rows[0]));
  } catch (error) {
    next(error)
  }
}

export async function createBook(req, res, next) {
  try {
    const { title, author, year } = req.body;
    const [result] = await pool.query(
      "INSERT INTO book (title, author, year) VALUES (?, ?, ?)", [title.trim(), author.trim(), Number(year)]);
    const [rows] = await pool.query("SELECT id, title, author, year FROM book WHERE id = ?", [result.insertId]);
    res.status(201).json(ok(rows[0]));
  } catch (error) {
    next(error)
  }
}

export async function updateBook(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, author, year } = req.body;
    const [exist] = await pool.query("SELECT id, title, author, year FROM book WHERE id = ?", [id]);
    if (exist.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found'});
    }
    await pool.query(
      "UPDATE book SET title=?, author=?, year=? WHERE id=?", [title.trim(), author.trim(), Number(year), id]);
    const [rows] = await pool.query("SELECT id, title, author, year FROM book WHERE id = ?", [id]);
    res.json(ok(rows[0]));
  } catch (error) {
    next(error)
  }
}

export async function patchBook(req, res, next) {
  try {
    const id = Number(req.params.id);
    const [exist] = await pool.query("SELECT id, title, author, year FROM book WHERE id = ?", [id]);
    if (exist.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found'});
    }
    const current = exist[0];
    const title = req.body.title !== undefined ? String(req.body.title !== undefined) : current.title;
    const author = req.body.author !== undefined ? String(req.body.author !== undefined) : current.author;
    const year = req.body.year !== undefined ? Number(req.body.year) : current.year;
    await pool.query(
      "UPDATE book SET title=?, author=?, year=? WHERE id=?", [title.trim(), author.trim(), Number(year), id]);
    const [rows] = await pool.query("SELECT id, title, author, year FROM book WHERE id = ?", [id]);
    res.json(ok(rows[0]));
  } catch (error) {
    next(error)
  }
}

export async function deleteBook(req, res, next) {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query("DELETE FROM book WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Book not found'});
    }
    res.json(ok({ id }));
  } catch (error) {
    next(error)
  }
}