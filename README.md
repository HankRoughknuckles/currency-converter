# Currency Converter

This app was made using vite on the frontend and expressJS on the backend.
You can see the backend repo here - https://github.com/HankRoughknuckles/currency-converter-backend

The reason for the backend is that CNB's CORS policy only allows things from their domain to access their API.  Therefore
I created a backend that would call CNB's api, but has a CORS policy that allows our frontend to access it.

Also, the backend parses the raw data from CNB and outputs it in a more standardized, readable format. This also allows
the backend to be pluggable, allowing us to easily use a different source for the exchange rates with only a small
amount of code changes.

## Installation
`npm install`

## Usage
### Development
`npm run dev`

### Tests
`npm run test`
or to turn on watch mode:
`npm run test:watch`
