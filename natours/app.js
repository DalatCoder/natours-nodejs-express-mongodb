const fs = require('fs');
const express = require('express');

const port = 3000;
const app = express();

app.use(express.json());

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id * 1;

  const tour = tours.find((t) => t.id === tourId);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = {
    id: newId,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'error when saving data',
        });
        return;
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((t) => t.id === tourId);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
    return;
  }

  const updatedTour = {
    ...tour,
    ...req.body,
  };

  tours = tours.map((t) => (t.id === tourId ? updatedTour : t));

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'error when saving file',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id * 1;

  tours = tours.filter((t) => t.id !== tourId);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'error when saving file',
        });
        return;
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
