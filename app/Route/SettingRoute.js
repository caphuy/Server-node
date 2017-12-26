const express = require('express'),
			router = express.Router(),
			SettingController = require('../Controller/SettingController')

router.put('/upsert', SettingController.upsert);
router.get('/getbyroomid/:roomId', SettingController.getByRoomId);

module.exports = router;