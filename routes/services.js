const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateService, validateObjectIdParam } = require('../middleware/validate');

// Auth required routes
router.get('/', auth, serviceController.getAllServices);
router.get('/:id', auth, validateObjectIdParam, serviceController.getServiceById);

// Protected routes - admin only
router.post('/', auth, roleCheck, validateService, serviceController.createService);
router.put('/:id', auth, roleCheck, validateObjectIdParam, validateService, serviceController.updateService);
router.delete('/:id', auth, roleCheck, validateObjectIdParam, serviceController.deleteService);

module.exports = router;
