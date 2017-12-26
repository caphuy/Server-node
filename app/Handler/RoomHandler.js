'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil');

module.exports = {

  add(room) {
    return Model.room.create(room);
  },

  getRoomById(id) {
    return Model.room.findById(id);
  },

}