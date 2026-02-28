const Contact = require('../models/Contact');

// @desc    Submit a new contact form
// @route   POST /api/contacts
// @access  Public
const submitContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const createdContact = await contact.save();
        res.status(201).json(createdContact);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            contact.status = req.body.status;
            const updatedContact = await contact.save();
            res.json(updatedContact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

module.exports = { submitContact, getContacts, updateContactStatus };
