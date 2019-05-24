const express = require('express');
const { healthCheck } = require('../controllers/HealthCheck');
const { sensorInput } = require('../controllers/SensorInput')

const router = express.Router();

router.get('/health-check', healthCheck)
router.post('/sensors', sensorInput)

module.exports = router;