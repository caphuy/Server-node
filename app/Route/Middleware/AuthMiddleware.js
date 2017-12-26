var jwt = require('jsonwebtoken'),
		UtilConfig = require('../../Config/UtilConfig')


module.exports = (req, res, next) => {
	let token = req.body.token || req.query.token || req.headers['token'] || undefined;
	if (token !== undefined) {
		jwt.verify(token, UtilConfig.SECRET, (err, decoded) => {
			if (!err) {
				req.user = decoded.data;
				next();
			} else {
				return res.json({
					status: 0,
					msg: 'Failed to authenticate token'
				})
			}
		});
	} else {
		return res.status(403).send({
			status: 0,
			msg: 'No access token'
		})
	}
}