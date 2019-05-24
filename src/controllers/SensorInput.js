module.exports = {
  sensorInput: (req, res, next) => {
    const SensorData = req.body
    console.log(req.body)
    res.payload = {
      payload: SensorData
    }
    return next();
  },
};