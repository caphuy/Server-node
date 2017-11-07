var SubjectHandler = require('../Handler/SubjectHandler'),
    ResponseUtil = require('../Util/ResponseUtil');

module.exports = {

  add: (req, res) => {
    let name = req.body.name || undefined;
    let description = req.body.description || undefined;
    if (name !== undefined && description !== undefined) {
      SubjectHandler.add({
				name: name,
				description: description
      }).then(data => {
				res.json({
					status: 1,
					data: data
				});
			}).catch(e => {
				res.json(ResponseUtil.err(e));
			})
    }
  }
}
