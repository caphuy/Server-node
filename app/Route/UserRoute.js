var express = require('express'),
    router = express.Router(),
    UserController = require('../Controller/UserController'),
    AuthMiddleware = require('./Middleware/AuthMiddleware');

router.use(AuthMiddleware);
router.get('/get', UserController.getUser);

module.exports = router;