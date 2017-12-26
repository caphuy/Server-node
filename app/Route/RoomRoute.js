const express = require('express'),
			router = express.Router(),
			RoomController = require('../Controller/RoomController')

router.post('/add', RoomController.add);

module.exports = router;