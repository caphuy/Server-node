
'use strict';

const LikeHandler = require('../Handler/LikeHandler'),
      ResponseUtil = require('../Util/ResponseUtil');

module.exports = {
  
  add: (req, res) => {
    let lectureId = req.user._id;
    let studentId = req.body.studentId;
    LikeHandler.add({
      lecture: lectureId,
      student: studentId
    }).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    });
  },

  

}