# Playwright API Automation Framework

This project automates API testing of a FastAPI backend using Playwright's built-in request API.

## ✅ Features
- Full CRUD testing for `/users` endpoint
- Request chaining: Create → Read → Update → Delete
- Positive & negative scenarios
- Detailed HTML report
- GitHub Actions CI/CD integration

## 🚀 Getting Started

### 1. Run FastAPI Backend

```bash
cd fastapi-app
python -m uvicorn main:app --reload