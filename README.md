## How to Use the app

### Install dependencies

`npm install`

### Run the API server

`npm run dev`

## API endpoints

#### Get status of api

- GET /

#### Envelopes routes

- GET /envelopes
  Returns an array of all envelopes
  <br>
- POST /envelopes
  Add a single envelope :
  fields required:

  - title: string
  - budget: integer
    <br>

- GET /envelopes/:id
  Get an envelope by id
  <br>

- DELETE /envelopes/:id
  Delete envelope by id
  <br>

- PUT /envelopes/:id
  Update fields from the envelope add, e.g. update budget or title or both
  <br>

- POST /envelopes/transfer/:from/:to
  Transfer an amount from one envelope to another by their ids
  required field;
  - amount: string - amount to transfer
    <br>
