const request = require('supertest');
const app = require('../index');

describe('Todo API', () => {
  describe('GET /api/todos', () => {
    it('should return empty array initially', async () => {
      const response = await request(app).get('/api/todos');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        title: 'Test Todo',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/todos')
        .send(newTodo);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        title: 'Test Todo',
        description: 'Test Description',
        completed: false
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
    });

    it('should return error when title is missing', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ description: 'Test Description' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title is required');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
