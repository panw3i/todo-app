const request = require('supertest');
const app = require('../index');

describe('输入验证测试', () => {
  describe('POST /api/todos 验证', () => {
    it('应该拒绝空标题', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ description: '测试描述' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('输入数据验证失败');
      expect(response.body.details).toContain('标题是必填项');
    });

    it('应该拒绝非字符串标题', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 123, description: '测试描述' });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('标题必须是字符串');
    });

    it('应该拒绝只有空格的标题', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '   ', description: '测试描述' });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('标题不能为空');
    });

    it('应该拒绝过长的标题', async () => {
      const longTitle = 'a'.repeat(101);
      const response = await request(app)
        .post('/api/todos')
        .send({ title: longTitle, description: '测试描述' });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('标题长度不能超过100个字符');
    });

    it('应该拒绝非字符串描述', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '测试标题', description: 123 });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('描述必须是字符串');
    });

    it('应该拒绝过长的描述', async () => {
      const longDescription = 'a'.repeat(501);
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '测试标题', description: longDescription });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('描述长度不能超过500个字符');
    });

    it('应该接受有效的待办事项数据', async () => {
      const validTodo = {
        title: '有效的测试标题',
        description: '有效的测试描述'
      };

      const response = await request(app)
        .post('/api/todos')
        .send(validTodo);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('有效的测试标题');
      expect(response.body.description).toBe('有效的测试描述');
    });

    it('应该正确处理没有描述的待办事项', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '只有标题的待办事项' });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('只有标题的待办事项');
      expect(response.body.description).toBe('');
    });
  });

  describe('PUT /api/todos/:id 验证', () => {
    let todoId;

    beforeEach(async () => {
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ title: '测试待办事项', description: '测试描述' });
      todoId = createResponse.body.id;
    });

    it('应该拒绝没有任何更新字段的请求', async () => {
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('至少需要提供一个要更新的字段');
    });

    it('应该拒绝非布尔值的completed字段', async () => {
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ completed: 'true' });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('完成状态必须是布尔值');
    });

    it('应该接受有效的更新数据', async () => {
      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ 
          title: '更新的标题',
          description: '更新的描述',
          completed: true 
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('更新的标题');
      expect(response.body.description).toBe('更新的描述');
      expect(response.body.completed).toBe(true);
    });
  });
});
