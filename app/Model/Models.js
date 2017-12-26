'use strict';

const mongoose = require('mongoose');

module.exports = {

  user: mongoose.model('User', mongoose.Schema({
    username: String,
    password: String,
    role: Number, // 1: lecture, 2: student
    created: {
      type: Date,
      default: new Date()
    },
    details: {
      fullname: String,
      major: String,
      email: String,
      dob: Date,
      phone: String,
      avt: String,
      rfid: String,
      description: String
    }
  })),

  subject: mongoose.model('Subject', mongoose.Schema({
    name: String,
    description: String
  })),

  room: mongoose.model('Room', mongoose.Schema({
    name: String,
    description: String
  })),

  chair: mongoose.model('Chair', mongoose.Schema({
    id: Number,
    room: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    location: {
      x: Number,
      y: Number
    },
    status: {
      type: Boolean,
      default: false
    }
  })),

  class: mongoose.model('Class', mongoose.Schema({
    name: String,
    subject: mongoose.Schema.Types.ObjectId,
    lecture: mongoose.Schema.Types.ObjectId,
    room: mongoose.Schema.Types.ObjectId,
    shift: mongoose.Schema.Types.ObjectId
  })),

  shift: mongoose.model('Shift', mongoose.Schema({
    name: Number,
    start: Number,
    end: Number
  })),

  class_detail: mongoose.model('Class_detail', mongoose.Schema({
    class: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId
  })),

  class_log: mongoose.model('Class_log', mongoose.Schema({
    room: mongoose.Schema.Types.ObjectId,
    start: Date,
    end: Date,
    duration: Number,
    user: mongoose.Schema.Types.ObjectId,
    chair: Number
  })),

  roll_up: mongoose.model('Roll_up', mongoose.Schema({
    class: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    status: Boolean,
    date: Date
  })),

  setting: mongoose.model('Setting', mongoose.Schema({
    room: mongoose.Schema.Types.ObjectId,
    width: Number,
    height: Number,
    n: Number,
    A1: Number,
    A2: Number,
    A3: Number,
    column: Number,
    lim_weight: Number
  })),

  calendar: mongoose.model('Calendar', mongoose.Schema({
    class: mongoose.Schema.Types.ObjectId,
    time: Date
  })),

  point: mongoose.model('Point', mongoose.Schema({
    student: mongoose.Schema.Types.ObjectId,
    class: mongoose.Schema.Types.ObjectId,
    type: Number, //1: CC; 2: HS1; 3: HS2; 4: HK
    value: Number,
  })),

  like: mongoose.model('Like', mongoose.Schema({
    lecture: mongoose.Schema.Types.ObjectId,
    student: mongoose.Schema.Types.ObjectId
  }))
}