'use strict'

var ClassDetailHandler = require('../Handler/ClassDetailHandler'),
    ResponseUtil = require('../Util/ResponseUtil')

module.exports = {

  add: (req, res) => {
    let classId = req.body.class || undefined;
    let user = req.body.user || undefined;
    if (classId !== undefined && user !== undefined) {
      ClassDetailHandler.add({
        class: classId,
        user: user,
      }).then(data => {
        res.json({
          status: 1,
          data: data
        });
      }).catch(e => {
        res.json(ResponseUtil.err(e));
      });
    }
  },

  getbyclassid: (req, res) => {
    let classId = req.params.classId;
    ClassDetailHandler.getByClassId(classId).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    })
  }
}