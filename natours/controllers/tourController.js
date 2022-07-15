const fs = require('fs');

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTourById = (req, res) => {
  const tourId = req.params.id * 1;

  const tour = tours.find(t => t.id === tourId);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found'
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = {
    id: newId,
    ...req.body
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'error when saving data'
        });
        return;
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTourById = (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find(t => t.id === tourId);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found'
    });
    return;
  }

  const updatedTour = {
    ...tour,
    ...req.body
  };

  tours = tours.map(t => (t.id === tourId ? updatedTour : t));

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'error when saving file'
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    }
  );
};

exports.deleteTourById = (req, res) => {
  const tourId = req.params.id * 1;

  tours = tours.filter(t => t.id !== tourId);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
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
