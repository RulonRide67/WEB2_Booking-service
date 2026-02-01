const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Protected routes - admin only
router.post('/', auth, roleCheck, serviceController.createService);
router.put('/:id', auth, roleCheck, serviceController.updateService);
router.delete('/:id', auth, roleCheck, serviceController.deleteService);

module.exports = router;