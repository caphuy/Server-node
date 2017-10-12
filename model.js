"use strict";

var mongoose = require('mongoose');

module.exports = {
  measure: mongoose.model('Measure', mongoose.Schema({
    temperature: {
      type: Number,
      required: true
    },
    humid: {
      type: Number,
      default: false
    },
    created: {
      type: Date,
      default: new Date()
    },
  }))

};