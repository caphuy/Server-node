const Model = require('../Model/Models');

module.exports = {

  getByRoomId(roomId) {
    return Model.setting.findOne({
      room: roomId
    });
  },

  upsert(setting) {
    return Model.setting.update({
      room: setting.room
    }, {
      $set: {
        width: setting.width,
        height: setting.height,
        n: setting.n,
        A1: setting.A1,
        A2: setting.A2,
        A3: setting.A3,
        column: setting.column,
        lim_weight: setting.lim_weight
      },
      $setOnInsert: {
        room: setting.room
      }
    }, {
      upsert: true
    });
  }
}