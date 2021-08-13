import express from 'express';

require('dotenv').config();

const port = process.env.PORT || 5050;
const app = express();

app.listen(port, () => {
  console.log(`Server has started at http://localhost:${port}`);
});
