const Package = require('../models/Package');

// @desc    Fetch all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
    try {
        const query = req.query.category ? { category: req.query.category } : {};
        const packages = await Package.find(query);
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (pkg) {
            res.json(pkg);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
    try {
        const pkg = new Package(req.body);
        const createdPackage = await pkg.save();
        res.status(201).json(createdPackage);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (pkg) {
            Object.assign(pkg, req.body);
            const updatedPackage = await pkg.save();
            res.json(updatedPackage);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (pkg) {
            await pkg.deleteOne();
            res.json({ message: 'Package removed' });
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPackages, getPackageById, createPackage, updatePackage, deletePackage };
