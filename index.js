const express = require('express');
const cors = require('cors');
const { validateCreateTodo, validateUpdateTodo } = require('./src/middleware/validation');
const { setSecurityHeaders, rateLimit } = require('./src/middleware/security');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] // 生产环境允许的域名
    : true, // 开发环境允许所有域名
  credentials: true, // 允许发送cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 预检请求缓存时间（24小时）
};

// 应用安全中间件
app.use(setSecurityHeaders);
app.use(rateLimit);

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // 限制请求体大小
app.set('trust proxy', 1); // 信任第一级代理（用于获取真实IP）

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
