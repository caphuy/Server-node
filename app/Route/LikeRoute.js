var express = require('express'),
		router = express.Router(),
		AuthMiddleware = require('./Middleware/AuthMiddleware'),
    LikeController = require('../Controller/LikeController');

router.use(AuthMiddleware);
router.post('/add', LikeController.add);

module.exports = router;