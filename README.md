# listat-test-case

### Test case for Listat Software.

## Dependencies

### Express.js

### Jest and Supertest for tests

# Prepare App

### 1. Download repository

### 2. Open terminal inside repository folder

### 3. Run "yarn install" or "npm install"

# Launch App

### Run "yarn run start" or "npm run start"

## App endpoints

### GET /result -> read file results.txt, and return it content

### POST /data -> get array with expressions in request body, validate it, and calculate. If all expressions are valid, save results to file results.txt and returns status 200. Else, write empty string to file and returns 400

### GET /random -> returns random expression. Each expressions have from 3 to 20 values, result can be float or negative

### GET /random/:expSize -> returns array with expressions, useful for testing, max array size is 100000.

# Performance for 100000 expressions (max size)

### localhost:3110/random/100000 -> Response Time: 254 ms. Size: 6.75 MB

### localhost:3110/data -> Response Time: 2.40 ms.

### localhost:3110/result -> Response Time: 26 ms. Size: 1.87 MB

### Full tests with generating 100000 expressions -> 5.01 s

# Start Tests

### Run "yarn run start" or "npm run test"

## Coverage

PASS **tests**/helpers.test.js
PASS **tests**/app.test.js
------------|---------|----------|---------|---------|-------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|-------------------
All files | 85.37 | 75 | 86.67 | 86.67 |  
 Helpers.js | 91.84 | 81.58 | 100 | 93.02 | 27,33,42  
 app.js | 74.19 | 50 | 50 | 76.67 | 38-39,42-47  
 config.js | 100 | 100 | 100 | 100 |  
------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests: 34 passed, 34 total
Snapshots: 0 total
Time: 4.56 s
Ran all test suites.
Done in 5.10s.

# Config

## ./config.js file has some options.

### HTTP_PORT = http port used by application. Default is 3110.

### MAX_NUMBER = max possible number in expressions. Default is 1000

### RESULTS_FILE = filepath to save results data. Default is 'results.txt'.

### ERRORS_SHOW = on true when some expression will be defined as invalid, message will be shown by console.error method. On false, app will not notify you. Default is false

### ACCEPT_SIMPLE = on true, expressions like "2", "+4", "454+", be valid. Default is false.

### ACCEPT_NEGATIVE = on true, expressions with negative values will valid. Default is false.

### ACCEPT_ZERO = on true, expressions with zero be valid. Default is false.
