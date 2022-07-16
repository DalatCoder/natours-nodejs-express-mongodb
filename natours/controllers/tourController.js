const fs = require('fs');
const Tour = require('../models/tourModel');

let tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTourById = async (req, res) => {
  const tourId = req.params.id;

  const tour = await Tour.findById(tourId);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};

exports.updateTourById = async (req, res) => {
  const tourId = req.params.id;
  const updatedFields = req.body;

  const updatedTour = await Tour.findByIdAndUpdate(tourId, updatedFields, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour
    }
  });
};

exports.deleteTourById = (req, res) => {
  const tourId = req.params.id * 1;

  tourData = tourData.filter(t => t.id !== tourId);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tourData),
    err => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'error when saving file'
        });
        return;
      }

      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );
};
