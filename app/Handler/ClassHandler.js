'use strict';

var Model = require('../Model/Models'),
    BaseUtil = require('../Util/BaseUtil'),
    mongoose = require('mongoose');

module.exports = {

  async add(classModel) {
    return Model.class.create(classModel);
  },

  getClassesByLectureId(lectureId) {
    return Model.class.aggregate([
      {
        $match: {
          lecture: mongoose.Types.ObjectId(lectureId)
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'room'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'lecture',
          foreignField: '_id',
          as: 'lecture'
        }
      },
      {
        $lookup: {
          from: 'subjects',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject'
        }
      },
      {
        $lookup: {
          from: 'shifts',
          localField: 'shift',
          foreignField: '_id',
          as: 'shift'
        }
      },
      {
        $lookup: {
          from: 'calendars',
          localField: '_id',
          foreignField: 'class',
          as: 'calendar'
        }
      },
      {
        $project: {
          _id: 1,
          subject: {$ifNull: [{$arrayElemAt: ["$subject", 0]}, null]},
          lecture: {$ifNull: [{$arrayElemAt: ["$lecture", 0]}, null]},
          room: {$ifNull: [{$arrayElemAt: ["$room", 0]}, null]},
          shift: {$ifNull: [{$arrayElemAt: ["$shift", 0]}, null]},
          calendar: {$ifNull: [{$arrayElemAt: ["$calendar", 0]}, null]},
          name: 1
        }
      }
    ]);
  }
}