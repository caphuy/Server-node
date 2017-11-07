var express = require('express'),
    router = express.Router(),
    ClassDetailController = require('../Controller/ClassDetailController')

router.post('/add', ClassDetailController.add);
router.get('/getbyclassid/:classId', ClassDetailController.getbyclassid);

module.exports = router;