const express = require('express');
const router = express.Router();
const controller = require('../controllers/caseController');
const auth = require('../middleware/auth');

// Create a new case
router.post('/', auth, controller.createCase);

// Get all cases
router.get('/', auth, controller.getCases);

// Update a case by ID
router.patch('/:id', auth, controller.updateCase);

// Delete a case by ID
router.delete('/:id', auth, controller.deleteCase);

module.exports = router;
