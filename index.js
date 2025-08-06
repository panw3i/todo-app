const express = require('express');
const cors = require('cors');
const { validateCreateTodo, validateUpdateTodo } = require('./src/middleware/validation');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
let todos = [];
let nextId = 1;

/**
 * Get all todos
 * @route GET /api/todos
 */
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

/**
 * Create a new todo
 * @route POST /api/todos
 * @param {string} title - The todo title
 * @param {string} description - The todo description
 */
app.post('/api/todos', validateCreateTodo, (req, res) => {
  const { title, description } = req.body;
  
  const todo = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(todo);
  res.status(201).json(todo);
});

/**
 * Update a todo
 * @route PUT /api/todos/:id
 */
app.put('/api/todos/:id', validateUpdateTodo, (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { title, description, completed } = req.body;
  
  if (title !== undefined) todos[todoIndex].title = title;
  if (description !== undefined) todos[todoIndex].description = description;
  if (completed !== undefined) todos[todoIndex].completed = completed;
  
  res.json(todos[todoIndex]);
});

/**
 * Delete a todo
 * @route DELETE /api/todos/:id
 */
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
