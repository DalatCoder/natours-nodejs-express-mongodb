const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  const queryObj = { ...req.query };

  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(e => delete queryObj[e]);

  const tours = await Tour.find(queryObj);

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

exports.deleteTourById = async (req, res) => {
  const tourId = req.params.id;

  await Tour.findByIdAndDelete(tourId);

  res.status(204).json({
    status: 'success',
    data: null
  });
};
