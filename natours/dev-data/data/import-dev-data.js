const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');

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
  .then(() => {
    console.log('DB connection successfully');
  })
  .catch(err => {
    console.log(err);
  });

// READING JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
