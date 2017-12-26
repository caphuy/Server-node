'use strict';

const SettingHandler = require('../Handler/SettingHandler'),
      ResponseUtil = require('../Util/ResponseUtil')

module.exports = {

  upsert: (req, res) => {
    let room = req.body.room;
    let width = req.body.width;
    let height = req.body.height;
    let n = req.body.n;
    let a1 = req.body.a1;
    let a2 = req.body.a2;
    let a3 = req.body.a3;
    let column = req.body.column;
    let limWeight = req.body.lim_weight;

    SettingHandler.upsert({
      room: room,
      width: width,
      height: height,
      n: n,
      A1: a1,
      A2: a2,
      A3: a3,
      column: column,
      lim_weight: limWeight
    }).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    });
  },

  getByRoomId: (req, res) => {
    let roomId = req.params.roomId;
    
    SettingHandler.getByRoomId(roomId).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    })
  }

}