# Gemini AI 集成配置指南

## 🚀 快速开始

### 1. 获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 登录您的Google账号
3. 创建新的API Key
4. 复制生成的API Key

### 2. 配置 GitHub 仓库

#### 添加 Secrets

进入 GitHub 仓库 → Settings → Secrets and variables → Actions → Secrets

必需的 Secrets：
- `GEMINI_API_KEY` - 您的 Gemini API 密钥

可选的 Secrets（用于增强安全性）：
- `APP_ID` - GitHub App ID
- `APP_PRIVATE_KEY` - GitHub App 私钥

#### 添加 Variables

进入 Settings → Secrets and variables → Actions → Variables

如果使用 GCP Workload Identity Federation：
- `GCP_WIF_PROVIDER` - WIF Provider 资源名
- `GOOGLE_CLOUD_PROJECT` - GCP 项目 ID
- `GOOGLE_CLOUD_LOCATION` - GCP 位置（如: us-central1）
- `SERVICE_ACCOUNT_EMAIL` - 服务账号邮箱

### 3. 测试集成

#### 自动 PR 审查
1. 创建新的功能分支
2. 修改代码并提交
3. 创建 Pull Request
4. Gemini AI 将自动审查您的代码

#### 自动 Issue 标签
1. 创建新的 Issue（不添加标签）
2. 等待最多1小时
3. Gemini AI 将自动分析并添加合适的标签

#### AI 助手交互
在任何 PR 或 Issue 评论中使用：
- `@gemini-cli /review` - 重新审查代码
- `@gemini-cli /explain` - 解释代码变更
- `@gemini-cli /test` - 建议测试方案
- `@gemini-cli help` - 显示帮助信息

## 🔧 高级配置

### Workload Identity Federation 设置

如果您想使用 GCP 的 Workload Identity Federation 而不是 API Key：

1. 在 GCP 中创建 WIF Provider
2. 创建服务账号并分配适当权限
3. 配置 GitHub Actions 的身份映射
4. 在仓库变量中添加相关配置

### 自定义 Gemini 模型设置

您可以在工作流文件中调整以下设置：

```yaml
settings: |
  {
    "model": "gemini-2.5-pro",        # 或 "gemini-2.5-flash"
    "temperature": 0.2,               # 0.0-1.0
    "max_output_tokens": 2048,        # 最大输出长度
    "safety_settings": {              # 安全设置
      "harassment": "BLOCK_NONE",
      "hate_speech": "BLOCK_NONE"
    }
  }
```

### 自定义提示词

您可以修改 `.github/workflows/` 中的工作流文件来自定义 Gemini 的行为：

1. **PR 审查提示词** (`gemini-pr-review.yml`)
2. **Issue 分流提示词** (`gemini-issue-triage.yml`)  
3. **AI 助手提示词** (`gemini-assistant.yml`)

## 📊 监控和日志

### 查看 GitHub Actions 日志
1. 进入仓库的 Actions 标签页
2. 点击相应的工作流运行
3. 查看每个步骤的详细日志

### GCP 监控（如果启用）
如果配置了 GCP 集成和遥测：
1. 在 Cloud Console 中查看 Cloud Trace
2. 检查 Cloud Monitoring 中的指标
3. 查看 Cloud Logging 中的日志

## 🔍 故障排除

### 常见问题

#### API Key 无效
- 检查 `GEMINI_API_KEY` 是否正确设置
- 确认 API Key 未过期
- 验证 API 配额是否充足

#### 工作流未触发
- 检查工作流文件语法是否正确
- 确认触发事件配置正确
- 验证分支保护规则设置

#### 权限错误
- 确认 GitHub Actions 具有必要的权限
- 检查仓库的 Actions 设置
- 验证 WIF 配置（如果使用）

### 调试步骤

1. **查看 Actions 日志**
   ```bash
   gh run list
   gh run view [run-id] --log
   ```

2. **测试 API 连接**
   ```bash
   curl -H "Authorization: Bearer $GEMINI_API_KEY" \
        https://generativelanguage.googleapis.com/v1beta/models
   ```

3. **验证工作流语法**
   ```bash
   # 本地验证工作流文件
   yamllint .github/workflows/*.yml
   ```

## 📈 最佳实践

### 成本优化
- 使用 `gemini-2.5-flash` 模型减少成本
- 设置适当的 temperature 值（0.1-0.3）
- 限制最大输出长度
- 针对性编写提示词，避免冗长输出

### 安全建议
- 使用 GitHub App 而不是 personal access token
- 启用 WIF 替代长期 API Key
- 定期轮换密钥
- 设置适当的权限范围

### 性能优化
- 缓存依赖项加速工作流
- 并行执行独立任务
- 使用条件判断避免不必要的执行

## 🎯 使用场景示例

### 代码审查自动化
```yaml
# 示例：严格的代码审查
prompt: |
  作为资深代码审查员，请严格按照以下标准审查代码：
  1. 安全漏洞检测
  2. 性能问题识别
  3. 代码规范合规性
  4. 测试覆盖率评估
  5. 最佳实践建议
```

### Issue 智能分类
```yaml
# 示例：多维度 Issue 分类
prompt: |
  分析 Issue 并分配标签：
  - 紧急度：critical/high/medium/low
  - 类型：bug/feature/enhancement/question
  - 模块：frontend/backend/api/database/docs
  - 难度：easy/medium/hard
```

## 🔗 相关链接

- [Gemini API 文档](https://ai.google.dev/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Workload Identity Federation 指南](https://cloud.google.com/iam/docs/workload-identity-federation)
- [项目 GitHub 仓库](https://github.com/panw3i/todo-app)

---

如果您遇到任何问题或需要帮助，请创建 Issue 或联系项目维护者。
