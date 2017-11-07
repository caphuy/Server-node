var express = require('express'),
    router = express.Router(),
    UserController = require('../Controller/UserController')

router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;