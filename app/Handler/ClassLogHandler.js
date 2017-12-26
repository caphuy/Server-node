'use strict';

const Model = require('../Model/Models'),
      BaseUtil = require('../Util/BaseUtil'),
      mongoose = require('mongoose');


module.exports = {

  upsert: async (classlog, status) => {
    let date = new Date();
    let classlogNotEnd = await Model.class_log.findOne({
      end: null,
      room: classlog.room,
      chair: classlog.chair
    });
    if (status && classlogNotEnd === null) {
      return await Model.class_log.create({
        room: classlog.room,
        start: date,
        end: null,
        duration: null,
        user: classlog.user,
        chair: classlog.chair
      });
    } else if (!status && classlogNotEnd !== null) {
      let start = new Date(classlogNotEnd.start).getTime();
      let endTime = date.getTime();
      let duration = endTime - start;
      return await Model.class_log.update({
        end: null,
        room: classlog.room,
        chair: classlog.chair
      }, {
        end: date,
        duration: duration,
      });
    }
  },

  getByRoom: (roomId) => {
    return Model.class_log.aggregate([
      {
        $match: {
          room: mongoose.Types.ObjectId(roomId),
          end: {
            $ne: null
          }
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
        $lookup: {
          from: 'chairs',
          localField: 'chair',
          foreignField: 'id',
          as: 'chair'
        }
      }, 
      {
        $project: {
          _id: 1,
          room: 1,
          start: 1,
          end: 1,
          duration: 1,
          user: {$ifNull: [{$arrayElemAt: ["$user", 0]}, null]},
          chair: {$ifNull: [{$arrayElemAt: ["$chair", 0]}, null]},
        }
      }
    ])
  }
}