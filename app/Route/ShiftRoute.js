const express = require('express'),
      router = express.Router(),
      ShiftController = require('../Controller/ShiftController')

router.post('/add', ShiftController.add);

module.exports = router;