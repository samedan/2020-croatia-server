const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users');
const {
  getRentals,
  getRentalById,
  createRental,
  // updateRental,
  // deleteRental,
} = require('../controllers/rentals');

// GET all
router.get('', getRentals);

// GET id
router.get('/:rentalId', getRentalById);

// POST
router.post('', onlyAuthUser, createRental);

// // DELETE
// router.delete('/:id', deleteRental);

// // PATCH id
// router.patch('/:id', updateRental);

module.exports = router;
