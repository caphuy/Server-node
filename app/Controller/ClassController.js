var ClassHandler = require('../Handler/ClassHandler'),
    ResponseUtil = require('../Util/ResponseUtil')

module.exports = {

  add: (req, res) => {
    let name = req.body.name || undefined;
    let subject = req.body.subject || undefined;
    let lecture = req.body.lecture || undefined;
    let room = req.body.room || undefined;
    let shift = req.body.shift || undefined;
    if (subject !== undefined && lecture !== undefined
        && room !== undefined && shift !== undefined) {
      ClassHandler.add({
        name: name,
        subject: subject,
        lecture: lecture,
        room: room,
        shift: shift
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

  getclassesbylectureid: (req, res) => {
    let _id = req.user._id;
    ClassHandler.getClassesByLectureId(_id).then(data => {
      res.json({
        status: 1,
        data: data
      });
    }).catch(e => {
      res.json(ResponseUtil.err(e));
    });
  }
}