const express = require('express');

const {
  getAllTours,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
  aliasTopTous
} = require('../controllers/tourController');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTous, getAllTours);

router
  .route('/')
  .get(getAllTours)
  .post(createNewTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
