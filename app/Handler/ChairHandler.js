'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil'),
    mongoose = require('mongoose');

module.exports = {

  async add(chair) {
    return Model.chair.create(chair);
  },

  async getByRoomId(roomId) {
    return Model.chair.aggregate([
      {
        $match: {
          room: mongoose.Types.ObjectId(roomId)
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
          id: 1,
          room: 1, 
          user: {$ifNull: [{ "$arrayElemAt": [ "$user", 0 ] }, null]} 
        }
      } 
    ]);
  }
}