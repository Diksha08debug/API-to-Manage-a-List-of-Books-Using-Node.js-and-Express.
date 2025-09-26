# Book API (Task 3)

Simple Node.js + Express REST API to manage a list of books (in-memory).

## Run
1. `npm install`
2. `npm start` (or `npm run dev` with nodemon)

## Endpoints
- GET /books
- GET /books/:id
- POST /books { title, author }
- PUT /books/:id { title?, author? }
- DELETE /books/:id

## Notes
Data is stored in memory (no DB). Restarting the server resets the data.
