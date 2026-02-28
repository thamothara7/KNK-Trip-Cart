const express = require('express');
const router = express.Router();
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPackages).post(protect, createPackage);
router.route('/:id').get(getPackageById).put(protect, updatePackage).delete(protect, deletePackage);

module.exports = router;
