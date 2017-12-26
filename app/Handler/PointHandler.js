'use strict';

const Model = require('../Model/Models'),
      BaseUtil = require('../Util/BaseUtil'),
      mongoose = require('mongoose');

module.exports = {

  add(point) {
    return Model.point.create(point);
  },

  update(point) {
    return Model.point.update({
      class: point.class,
      student: point.student,
      type: point.type
    }, {
      $set: {
        value: point.value
      }
    });
  },

  getByStudentAndClass(studentId, classId) {
    return Model.point.find({
      class: classId,
      student: studentId
    }).sort( { type: 1 } );
  }
}