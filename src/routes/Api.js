const express = require('express');
const { healthCheck } = require('../controllers/healthCheck');
const { displayData, putData } = require('../controllers/sensorData')

const router = express.Router();

router.get('/healthCheck', healthCheck)
router.post('/putData',putData)
router.get('/displayData',displayData)

module.exports = router;