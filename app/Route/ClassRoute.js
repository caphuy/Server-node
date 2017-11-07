var express = require('express'),
    router = express.Router(),
    ClassController = require('../Controller/ClassController')

router.post('/add', ClassController.add);

module.exports = router;