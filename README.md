# listat-test-case

### Test case for Listat Software.

# Prepare App

### 1. Download repository

### 2. Open terminal inside repository folder

### 3. Run "yarn install" or "npm install"

# Launch App

### Run "yarn run start" or "npm run start"

### Using Express.js

# Start Tests

### Run "yarn run start" or "npm run test"

## Coverage
$ jest --coverage
 PASS  __tests__/app.test.js
 PASS  __tests__/helpers.test.js
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|-------------------
All files   |   89.23 |    77.78 |     100 |   91.67 |                   
 Helpers.js |   85.71 |    81.08 |     100 |   86.84 | 18-19,26,32,41    
 app.js     |   95.24 |     62.5 |     100 |     100 | 29                
 config.js  |     100 |      100 |     100 |     100 |                   
------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        1.188 s
Ran all test suites.
Done in 1.79s.

# Config

## ./config.js file has some options.

### HTTP_PORT = http port used by application. Default is 3110.

### MAX_NUMBER = max possible number in expressions. Default is 1000

### RESULTS_FILE = filepath to save results data. Default is 'results.txt'.

### ERRORS_SHOW = on true when some expression will be defined as invalid, message will be shown by console.error method. On false, app will not notify you. Default is false

### ACCEPT_SIMPLE = on true, expressions like "2", "+4", "454+", be valid. Default is false.

### ACCEPT_NEGATIVE = on true, expressions with negative values will valid. Default is false.

### ACCEPT_ZERO = on true, expressions with zero be valid. Default is false.
