'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil');

module.exports = {

  async add(classModel) {
    return Model.class.create(classModel);
  }
}