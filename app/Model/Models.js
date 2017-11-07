'use strict';

var mongoose = require('mongoose');

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
    user: mongoose.Schema.Types.ObjectId
  })),

  class: mongoose.model('Class', mongoose.Schema({
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
    class: mongoose.Schema.ObjectId,
    user: mongoose.Schema.ObjectId
  }))

}