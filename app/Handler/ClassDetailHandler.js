'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil'),
    mongoose = require('mongoose');

module.exports = {

  async add(classDetail) {
    return Model.class_detail.create(classDetail);
  },

  async getByClassId(classId) {
    return Model.class_detail.aggregate([
      {
        $match: {
          class: mongoose.Types.ObjectId(classId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      { 
        "$project": { 
          class: 1, 
          user: { "$arrayElemAt": [ "$user", 0 ] } 
        }
      } 
    ]);
  }
}