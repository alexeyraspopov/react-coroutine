# Run acceptance tests
jest --ci --testResultsProcessor "jest-junit"

# Build lib files to ensure it's working
yarn run prepublish

# Check lib files size limit
yarn size-limit
