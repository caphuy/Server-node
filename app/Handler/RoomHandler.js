'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil');

module.exports = {

  async add(room) {
    return Model.room.create(room);
  }
}