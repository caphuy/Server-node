'use strict';

const Model = require('../Model/Models'),
      BaseUtil = require('../Util/BaseUtil'),
      mongoose = require('mongoose'),
      SettingHandler = require('./SettingHandler'),
      UserHandler = require('./UserHandler'),
      ClassLogHandler = require('./ClassLogHandler')

module.exports = {

  add(chair) {
    return Model.chair.create(chair);
  },

  update(cid, rid, chair) {
    return Model.chair.update({
      id: cid,
      room: rid
    }, {
      $set: {
        user: chair.user,
        location: chair.location,
        status: chair.status
      }
    })
  },

  getById(id) {
    return Model.chair.findById(id);
  },

  getByRoomId(roomId) {
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
          user: {$ifNull: [{ "$arrayElemAt": [ "$user", 0 ] }, null]},
          status: 1,
          location: 1
        }
      } 
    ]);
  },

  async getByCid(roomId, cid) {
    let chairs = await Model.chair.aggregate([
      {
        $match: {
          id: cid,
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
          user: {$ifNull: [{ "$arrayElemAt": [ "$user", 0 ] }, null]},
          status: 1,
          location: 1
        }
      }
    ]);
    return chairs[0] !== undefined & chairs[0] !== null ? chairs[0] : null;
  },

  getByRoomIdNLectureId(roomId, lectureId) {
    return Model.chair.aggregate([
      {
        $match: {
          room: mongoose.Types.ObjectId(roomId),
          // 'like.lecture': mongoose.Types.ObjectId(lectureId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'student'
        }
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'user',
          foreignField: 'student',
          as: "like"
        }
      },
      {
        "$match": {
          $or: [
            {
              "like.lecture": mongoose.Types.ObjectId(lectureId)
            },
            {
              "student": []
            }
          ]
        }
      },
      { 
        "$project": { 
          id: 1,
          room: 1, 
          student: {$ifNull: [{ "$arrayElemAt": [ "$student", 0 ] }, null]},
          status: 1,
          location: 1,
          like: {$ifNull: [{ "$arrayElemAt": [ "$like", 0 ] }, null]},
        }
      },
      {
        "$project": { 
          id: 1,
          room: 1, 
          student: 1,
          status: 1,
          location: 1,
          like: {$ifNull: [true, false]},
        }
      }
    ]);
  },

  updateUserInChairByCid(cid, rid, uid) {
    return Model.chair.update({
      id: cid,
      room: rid
    }, {
      $set: {
        user: uid
      }
    });
  },

  updateChairLocationByCid(cid, rid, location) {
    return Model.chair.update({
      id: cid,
      room: rid
    }, {
      $set: {
        location: location
      }
    });
  },

  calculateDistance(rssi, A, n) {
    if (rssi == 0) {
      return -1;
    }
    let ratio = rssi * 1.0 / A;
    if (ratio < 1.0) {
      return Math.pow(ratio, 10);
    } else {
      let accuracy = (0.89967) * Math.pow(ratio, 7.7095) + 0.111;
      return accuracy;
    }
  },

  checkTriangle(a, b, c) {
    if (a + b <= c){
      return this.checkTriangle(a * 1.1, b * 1.1, c);
    } else if (a + c <= b) {
      return this.checkTriangle(a * 1.1, c * 1.1, b);
    } else if (b + c <= a) {
      return this.checkTriangle(b * 1.1, c * 1.1, a);
    } else {
      return {
        a: a,
        b: b,
        c: c
      }
    }
  },

  calculateH(a, b, c) {
    let p = (a + b + c) / 2;
    let numerator = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    let h = numerator / c;
    return h;
  }, 

  async calculateLocation(data) {
    let roomId = data.roomId;
    let chairId = data.chairId;
    let r1 = data.r1;
    let r2 = data.r2;
    let r3 = data.r3;
    let rfid = data.rfid;
    let weight = data.weight;

    let setting = await SettingHandler.getByRoomId(roomId);
    let A1 = setting.A1;
    let A2 = setting.A2;
    let A3 = setting.A3;
    let width = setting.width;
    let height = setting.height;
    let n = setting.n;
    let limWeight = setting.lim_weight;

    let status = (weight >= limWeight && rfid !== '') ? true : false;
    let d1 = this.calculateDistance(r1, A1, n);
    let d2 = this.calculateDistance(r2, A2, n);
    let d3 = this.calculateDistance(r3, A3, n);

    let rebuildX = this.checkTriangle(d1, d2, width);
    let rebuildY = this.checkTriangle(d1, d3, height);

    let x = this.calculateH(rebuildX.a, rebuildX.b, rebuildX.c);
    let y = this.calculateH(rebuildY.a, rebuildY.b, rebuildY.c);

    let user = null;
    let userId = null;
    if (rfid !== '') {
      user = await UserHandler.getUserByRfid(rfid);
      userId = user._id;
    }
    let chairInfo = {
      user: userId,
      status: status,
      location: {
        x: x,
        y: y
      }
    };
    await this.update(chairId, roomId, chairInfo);

    let classlog = {
      room: roomId,
      user: userId,
      chair: chairId
    };
    await ClassLogHandler.upsert(classlog, status);

    let listChairs = await this.getByRoomId(roomId);
    let listChairsPublish = {
      status: 1,
      data: listChairs
    };

    let currentChair = await this.getByCid(roomId, chairId);
    // let chairPublish = {
    //   status: 1,
    //   data: currentChair
    // };

    return {
      listChairsPublish: listChairsPublish,
      chairPublish: currentChair,
      roomId: roomId
    }
  },

}