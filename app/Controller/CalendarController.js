
'use strict';

const CalendarHandler = require('../Handler/CalendarHandler'),
      ResponseUtil = require('../Util/ResponseUtil');

module.exports = {
  
  add: (req, res) => {
    let classId = req.body.class;
    let time = parseInt(req.body.time);
    CalendarHandler.add({
      class: classId,
      time: time
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