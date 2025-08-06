# Todo App - Gemini AI Integration Guide

## Project Overview
This is a Node.js todo application that demonstrates integration with Gemini AI for automated code review, issue triage, and development assistance.

## Architecture
```
todo-app/
├── src/
│   ├── controllers/     # Route handlers
│   ├── models/         # Data models
│   ├── middleware/     # Express middleware
│   └── utils/          # Utility functions
├── tests/              # Test files
├── docs/               # Documentation
└── .github/workflows/  # GitHub Actions workflows
```

## Code Standards

### JavaScript/Node.js
- Use ES6+ features (const/let, arrow functions, async/await)
- Follow conventional commit format
- Write unit tests for all business logic
- Use JSDoc for function documentation
- Maximum line length: 100 characters
- Use camelCase for variables and functions
- Use PascalCase for classes

### API Design
- RESTful endpoints
- Consistent error handling with proper HTTP status codes
- Request validation using middleware
- JSON responses with consistent structure

### Testing
- Jest for unit testing
- Test coverage should be > 80%
- Test file naming: `*.test.js`

### Git Workflow
- Feature branches: `feature/description`
- Bug fixes: `fix/description` 
- Use conventional commits
- Squash merge to main branch

## Business Context
This todo application serves as a demonstration of modern development practices including:
- AI-powered code review
- Automated issue management
- Intelligent development assistance
- CI/CD with GitHub Actions

## Review Guidelines
When reviewing code changes:
1. Check adherence to coding standards
2. Verify test coverage
3. Ensure proper error handling
4. Validate API design consistency
5. Look for security vulnerabilities
6. Check for performance implications
