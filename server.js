// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// parse JSON
app.use(express.json());

// In-memory "database"
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];
let nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET one book
app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST add book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Both title and author required' });

  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (!title && !author) return res.status(400).json({ error: 'Provide title or author to update' });

  books[index] = {
    ...books[index],
    title: title || books[index].title,
    author: author || books[index].author
  };

  res.json(books[index]);
});

// DELETE book
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLen = books.length;
  books = books.filter(b => b.id !== id);
  if (books.length === initialLen) return res.status(404).json({ error: 'Book not found' });

  res.sendStatus(204);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
