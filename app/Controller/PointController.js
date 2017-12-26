
'use strict';

const PointHandler = require('../Handler/PointHandler'),
      ResponseUtil = require('../Util/ResponseUtil');

module.exports = {
  
  add: (req, res) => {
    let classId = req.body.classId;
    let studentId = req.body.studentId;
    let type = req.body.type;
    let value = req.body.value;
    PointHandler.add({
      class: classId,
      student: studentId,
      type: type,
      value: value
    }).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    });
  },

  update: (req, res) => {
    let classId = req.body.classId;
    let studentId = req.body.studentId;
    let type = req.body.type;
    let value = req.body.value;
    PointHandler.update({
      class: classId,
      student: studentId,
      type: type,
      value: value
    }).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    });
  },

  getByStudentAndClass: (req, res) => {
    let classId = req.query.classId;
    let studentId = req.query.studentId;
    PointHandler.getByStudentAndClass(studentId, classId).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    })
  }

}