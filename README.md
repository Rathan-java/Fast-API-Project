# Playwright API Automation Framework

This project provides an API automation framework built with [Playwright](https://playwright.dev/) to test a simple FastAPI backend. The tests cover full CRUD operations on a `/users` endpoint and demonstrate request chaining and negative scenarios. Test execution can be triggered locally or via GitHub Actions.

## Features
- Full CRUD testing for `/users` endpoint
- Request chaining: create → read → update → delete
- Positive and negative scenarios
- Assertions on status codes, JSON payloads and headers
- HTML report generation
- GitHub Actions CI/CD integration
- Python unit tests with coverage

## Getting Started

### 1. Run FastAPI Backend
A minimal FastAPI app is included in `fastapi_app/`. Start it locally:

```bash
cd fastapi_app
pip install -r requirements.txt
uvicorn main:app --reload
```

The server listens on `http://localhost:8000` by default.

### 2. Install Node Dependencies
In a separate terminal, install the Node dependencies required for Playwright:

```bash
npm ci
npx playwright install --with-deps
```

### 3. Run Python Unit Tests

```bash
pytest fastapi_app/tests --cov=fastapi_app
```

### 4. Execute Playwright Tests
Run the Playwright integration tests:

```bash
npx playwright test
```

An HTML report will be generated in `playwright-report/`.

## Testing Strategy
The test flow is defined in `tests/user-crud.spec.js` using Playwright's request API. Tests share an API context to reuse the base URL. The output of one request is used as input for subsequent requests, ensuring the entire lifecycle of a user is validated. Negative scenarios verify proper error handling for duplicate creation and retrieval of deleted users.

Environment-specific configuration is managed using the `BASE_URL` environment variable which overrides the default base URL in `playwright.config.js`. This allows running the same test suite against different deployments.

GitHub Actions runs these tests on every push using the workflow defined in `.github/workflows/ci.yml`. The pipeline sets up Python and Node environments, runs the FastAPI unit tests with coverage, launches the FastAPI server, executes the Playwright integration tests, and uploads the HTML and coverage reports as artifacts.


