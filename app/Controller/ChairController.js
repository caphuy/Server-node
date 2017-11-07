var ChairHandler = require('../Handler/ChairHandler'),
    ResponseUtil = require('../Util/ResponseUtil')

module.exports = {

  add: (req, res) => {
    let id = req.body.id || undefined;
    let room = req.body.room || undefined;
    let user = req.body.user || null;
    if (room !== undefined && id !== undefined) {
      ChairHandler.add({
        id: id,
        room: room,
        user: user,
      }).then(data => {
        res.json({
          status: 1,
          data: data
        });
      }).catch(e => {
        res.json(ResponseUtil.err(e));
      });
    }
  },

  getbyroomid: (req, res) => {
    let roomId = req.params.roomId;
    ChairHandler.getByRoomId(roomId).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    });
  }
}