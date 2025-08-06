# Todo App with Gemini AI Integration

A modern Node.js todo application demonstrating AI-powered development workflows using Gemini AI for automated code review, issue management, and development assistance.

## Features

- RESTful API for todo management
- Automated code review with Gemini AI
- Intelligent issue triage and labeling
- AI-powered development assistant
- Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- GitHub CLI (gh)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd todo-app

# Install dependencies
npm install

# Start the development server
npm run dev

# Run tests
npm test
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /health` - Health check

## AI Integration Features

### 1. Automated PR Review
- Triggers on PR creation/updates
- Analyzes code quality, style, and best practices
- Provides actionable feedback in PR comments

### 2. Issue Triage
- Automatically categorizes new issues
- Applies appropriate labels (area/*, kind/*, priority/*)
- Runs hourly to process unlabeled issues

### 3. AI Assistant
- Respond to `@gemini-cli` mentions in PR/Issue comments
- Available commands:
  - `/review` - Re-run code review
  - `/explain` - Explain code changes
  - `/test` - Suggest testing approaches
  - `/docs` - Generate/update documentation

## Setup Instructions

### 1. GitHub Repository Setup

```bash
# Create and push to GitHub
gh repo create todo-app --public
git add .
git commit -m "feat: initial project setup with Gemini AI integration"
git push -u origin main
```

### 2. Configure Secrets and Variables

Add the following secrets in GitHub Settings → Secrets and variables → Actions:

**Secrets:**
- `GEMINI_API_KEY` - Your Gemini API key from Google AI Studio
- `APP_ID` - GitHub App ID (optional, for enhanced security)
- `APP_PRIVATE_KEY` - GitHub App private key (optional)

**Variables:**
- `GCP_WIF_PROVIDER` - Workload Identity Federation provider
- `GOOGLE_CLOUD_PROJECT` - Your GCP project ID
- `GOOGLE_CLOUD_LOCATION` - GCP location (e.g., us-central1)
- `SERVICE_ACCOUNT_EMAIL` - Service account email for authentication

### 3. Test the Integration

1. Create a feature branch and make changes
2. Open a PR - Gemini will automatically review it
3. Create an issue - It will be automatically labeled within an hour
4. Comment `@gemini-cli /explain` on any PR for AI assistance

## Development Guidelines

See [GEMINI.md](./GEMINI.md) for detailed code standards and review guidelines that the AI assistant follows.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the coding standards
4. Write tests for new functionality
5. Submit a pull request

The Gemini AI will automatically review your PR and provide feedback!

## License

MIT License - see [LICENSE](./LICENSE) file for details.
