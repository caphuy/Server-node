var express = require('express'),
    router = express.Router(),
    ClasslogController = require('../Controller/ClasslogController')

router.get('/getbyroomid/:roomId', ClasslogController.getbyroomid);

module.exports = router;