var express = require('express'),
		router = express.Router(),
		AuthMiddleware = require('./Middleware/AuthMiddleware'),
    ClassController = require('../Controller/ClassController');

router.use(AuthMiddleware);
router.post('/add', ClassController.add);
router.get('/getclassesbylectureid', ClassController.getclassesbylectureid);

module.exports = router;