var express = require('express'),
		router = express.Router(),
		AuthMiddleware = require('./Middleware/AuthMiddleware'),
    PointController = require('../Controller/PointController');

// router.use(AuthMiddleware);
router.post('/add', PointController.add);
router.put('/update', PointController.update);
router.get('/getbystudentandclass', PointController.getByStudentAndClass);

module.exports = router;