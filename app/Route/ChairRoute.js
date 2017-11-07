var express = require('express'),
    router = express.Router(),
    ChairController = require('../Controller/ChairController')

router.post('/add', ChairController.add);
router.get('/getbyroomid/:roomId', ChairController.getbyroomid)

module.exports = router;