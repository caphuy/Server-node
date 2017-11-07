'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil');

module.exports = {

  async add(subject) {
    return Model.subject.create(subject);
  }
}