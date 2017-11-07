var ShiftHandler = require('../Handler/ShiftHandler'),
    ResponseUtil = require('../Util/ResponseUtil')

module.exports = {

  add: (req, res) => {
    let name = req.body.name || undefined;
    let start = req.body.start || undefined;
    let end = req.body.end || undefined;
    if (name !== undefined && start !== undefined
        && end !== undefined) {
      ShiftHandler.add({
        name: name,
        start: start,
        end: end,
      }).then(data => {
        res.json({
          status: 1,
          data: data
        });
      }).catch(e => {
        res.json(ResponseUtil.err(e));
      });
    }
  }
}