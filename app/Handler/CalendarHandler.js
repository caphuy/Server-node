'use strict';

const Model = require('../Model/Models'),
      BaseUtil = require('../Util/BaseUtil'),
      mongoose = require('mongoose');

module.exports = {

  add(calendar) {
    return Model.calendar.create(calendar);
  }
}