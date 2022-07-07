const express = require('express');

const {
  getAllTours,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(createNewTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
