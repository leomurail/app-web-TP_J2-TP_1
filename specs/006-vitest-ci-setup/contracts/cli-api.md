# CLI Contract: Set up Vitest tests and CI

## Command: npm run test

- **Action**: Execute all unit and component tests once.
- **Output**: Terminal output showing test results (pass/fail count).
- **Exit Code**: 
    - `0`: All tests passed.
    - `non-zero`: One or more tests failed.

## Command: npm run test:watch

- **Action**: Start Vitest in watch mode.
- **Behavior**: Re-run tests when source files change.

## Command: npm run test:coverage

- **Action**: Execute all tests and generate a coverage report.
- **Output**: 
    - Terminal: Summary table of code coverage.
    - Directory: `coverage/` folder containing an HTML report.
