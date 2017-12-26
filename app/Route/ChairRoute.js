var express = require('express'),
    router = express.Router(),
    AuthMiddleware = require('./Middleware/AuthMiddleware'),
    ChairController = require('../Controller/ChairController')

router.use(AuthMiddleware);
router.post('/add', ChairController.add);
router.get('/getbyroomid/:roomId', ChairController.getbyroomid);
router.get('/getbyid/:_id', ChairController.getById);
router.get('/getbyroomidnlectureid/:roomId', ChairController.getbyroomidnlectureid);

module.exports = router;