const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');

const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
