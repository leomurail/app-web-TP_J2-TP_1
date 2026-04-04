# Quickstart: Set up Vitest tests and CI

## Prerequisites

- Node.js 20+
- `npm` (packaged manager)

## 1. Installation

Install the new testing dependencies:

```bash
npm install -D vitest @vitejs/plugin-vue @vue/test-utils jsdom @vitest/coverage-v8
```

## 2. Running Tests

Execute all tests once:

```bash
npm run test
```

Start Vitest in watch mode:

```bash
npm run test:watch
```

## 3. Coverage Reports

Generate a code coverage report:

```bash
npm run test:coverage
```

The report will be available in the `coverage/` directory and printed to the terminal.

## 4. CI Workflow

The tests are automatically executed on every push and Pull Request via GitHub Actions. You can check the status of your branch on GitHub.
