const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

const { DB_CONNECTION_STRING, DB_USERNAME, DB_PASS, DB_NAME } = process.env;
const DB_URI = DB_CONNECTION_STRING.replace('<USERNAME>', DB_USERNAME)
  .replace('<PASSWORD>', DB_PASS)
  .replace('<DB_NAME>', DB_NAME);

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(conn => {
    console.log('DB connection successfully');
  });

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
