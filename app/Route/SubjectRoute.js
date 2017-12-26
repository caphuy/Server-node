const express = require('express'),
      router = express.Router(),
      SubjectController = require('../Controller/SubjectController')

router.post('/add', SubjectController.add);

module.exports = router;