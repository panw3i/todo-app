/**
 * 安全头中间件
 * 添加基本的安全HTTP头以提升应用安全性
 */

/**
 * 设置安全相关的HTTP响应头
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一步函数
 */
const setSecurityHeaders = (req, res, next) => {
  // 防止点击劫持攻击
  res.setHeader('X-Frame-Options', 'DENY');
  
  // 防止MIME类型嗅探攻击
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // 启用XSS保护
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // 强制HTTPS（仅在生产环境）
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // 控制引用信息泄露
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 设置内容安全策略
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self';"
  );
  
  // 移除可能泄露服务器信息的头部
  res.removeHeader('X-Powered-By');
  
  next();
};

/**
 * 请求限流中间件（简单实现）
 * 基于IP地址限制请求频率
 */
const requestCounts = new Map();

const rateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15分钟窗口
  const maxRequests = 100; // 最大请求次数
  
  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  const clientData = requestCounts.get(clientIP);
  
  if (now > clientData.resetTime) {
    // 重置计数器
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count++;
  }
  
  if (clientData.count > maxRequests) {
    return res.status(429).json({
      error: '请求过于频繁',
      message: '您的请求过于频繁，请稍后再试',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }
  
  // 添加速率限制信息到响应头
  res.setHeader('X-RateLimit-Limit', maxRequests);
  res.setHeader('X-RateLimit-Remaining', maxRequests - clientData.count);
  res.setHeader('X-RateLimit-Reset', new Date(clientData.resetTime).toISOString());
  
  next();
};

module.exports = {
  setSecurityHeaders,
  rateLimit
};
