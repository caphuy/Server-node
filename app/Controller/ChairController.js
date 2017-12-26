
'use strict';

const ChairHandler = require('../Handler/ChairHandler'),
      ResponseUtil = require('../Util/ResponseUtil')


module.exports = {

  add: (req, res) => {
    let id = req.body.id || undefined;
    let room = req.body.room || undefined;
    let user = req.body.user || null;
    let x = req.body.x || null;
    let y = req.body.y || null;
    if (room !== undefined && id !== undefined) {
      ChairHandler.add({
        id: id,
        room: room,
        user: user,
        location: {
          x: x,
          y: y
        },
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
  },

  getById: (req, res) => {
    let _id = req.params._id;
    ChairHandler.getById(_id).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    })
  }, 

  getbyroomidnlectureid: (req, res) => {
    let roomId = req.params.roomId;
    let lectureId = req.user._id;
    ChairHandler.getByRoomIdNLectureId(roomId, lectureId).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    })
  }
}