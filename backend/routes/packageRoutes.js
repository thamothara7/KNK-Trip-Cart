const express = require('express');
const router = express.Router();
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');

// All routes are open (admin auth is handled on frontend side)
router.route('/').get(getPackages).post(createPackage);
router.route('/:id').get(getPackageById).put(updatePackage).delete(deletePackage);

module.exports = router;
