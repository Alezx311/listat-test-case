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

### For show files coverage, add --coverage after command, like "yarn run test --coverage"

### Using Jest & Supertest

# Config

## ./config.js file has some options.

### HTTP_PORT = http port used by application. Default is 3110.

### MAX_NUMBER = max possible number in expressions. Default is 1000

### RESULTS_FILE = filepath to save results data. Default is 'results.txt'.

### ERRORS_SHOW = on true when some expression will be defined as invalid, message will be shown by console.error method. On false, app will not notify you. Default is false

### ACCEPT_SIMPLE = on true, expressions like "2", "+4", "454+", be valid. Default is false.

### ACCEPT_NEGATIVE = on true, expressions with negative values will valid. Default is false.

### ACCEPT_ZERO = on true, expressions with zero be valid. Default is false.
