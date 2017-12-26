'use strict'

var ClassLogHandler = require('../Handler/ClassLogHandler'),
    ResponseUtil = require('../Util/ResponseUtil')

module.exports = {

  getbyroomid: (req, res) => {
    let roomId = req.params.roomId;
    ClassLogHandler.getByRoom(roomId).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    })
  }
}