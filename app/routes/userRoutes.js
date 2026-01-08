const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);

// NEW: fetch all users (for Cases.jsx)
router.get('/', auth, controller.getAllUsers);

module.exports = router;
