'use strict';

const Model = require('../Model/Models'),
      BaseUtil = require('../Util/BaseUtil'),
      mongoose = require('mongoose');

module.exports = {

  add(like) {
    return Model.like.create(like);
  }
}