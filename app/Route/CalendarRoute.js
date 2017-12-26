const express = require('express'),
      router = express.Router(),
      CalendarController = require('../Controller/CalendarController')

router.post('/add', CalendarController.add);

module.exports = router;