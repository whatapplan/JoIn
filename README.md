# After download the repo
npm i && ionic serve

# Para test con report (General)
npm run e2e:ci; npm run e2e:coverage

# Para test individual
npx cypress open

# Carpeta donde estan los tests
cypress/integration

# Resultados de coverage
coverage\lcov-report\index.html
