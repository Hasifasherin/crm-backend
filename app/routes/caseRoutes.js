const express = require('express');
const router = express.Router();
const controller = require('../controllers/caseController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createCase);
router.get('/', auth, controller.getCases);
router.patch('/:id', auth, controller.updateCase);

module.exports = router;
