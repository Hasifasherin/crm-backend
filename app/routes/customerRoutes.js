const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createCustomer);
router.get('/', auth, controller.getCustomers);
router.get('/:id', auth, controller.getCustomer);
router.patch('/:id', auth, controller.updateCustomer);
router.delete('/:id', auth, controller.deleteCustomer);

module.exports = router;
