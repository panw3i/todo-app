/**
 * 输入验证中间件
 * 提供通用的请求数据验证功能
 */

/**
 * 验证创建待办事项的请求数据
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象  
 * @param {Function} next - Express下一步函数
 */
const validateCreateTodo = (req, res, next) => {
  const { title, description } = req.body;
  
  const errors = [];
  
  // 验证标题
  if (!title) {
    errors.push('标题是必填项');
  } else if (typeof title !== 'string') {
    errors.push('标题必须是字符串');
  } else if (title.trim().length === 0) {
    errors.push('标题不能为空');
  } else if (title.length > 100) {
    errors.push('标题长度不能超过100个字符');
  }
  
  // 验证描述（可选）
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('描述必须是字符串');
    } else if (description.length > 500) {
      errors.push('描述长度不能超过500个字符');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: '输入数据验证失败',
      details: errors
    });
  }
  
  next();
};

/**
 * 验证更新待办事项的请求数据
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一步函数
 */
const validateUpdateTodo = (req, res, next) => {
  const { title, description, completed } = req.body;
  
  const errors = [];
  
  // 至少需要一个字段进行更新
  if (title === undefined && description === undefined && completed === undefined) {
    errors.push('至少需要提供一个要更新的字段');
  }
  
  // 验证标题
  if (title !== undefined) {
    if (typeof title !== 'string') {
      errors.push('标题必须是字符串');
    } else if (title.trim().length === 0) {
      errors.push('标题不能为空');
    } else if (title.length > 100) {
      errors.push('标题长度不能超过100个字符');
    }
  }
  
  // 验证描述
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push('描述必须是字符串');
    } else if (description.length > 500) {
      errors.push('描述长度不能超过500个字符');
    }
  }
  
  // 验证完成状态
  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('完成状态必须是布尔值');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: '输入数据验证失败',
      details: errors
    });
  }
  
  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo
};
