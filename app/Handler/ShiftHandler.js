'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil');

module.exports = {

  async add(shift) {
    return Model.shift.create(shift);
  }
}