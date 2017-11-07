// var jwt = require('jwt'),
// 		UtilConfig = require('../../Config/UtilConfig')


// module.exports = (req, res, next) => {
// 	let token = req.body.token || req.query.token || req.headers['token'] || undefined;
// 	if (token !== undefined) {
// 		jwt.verify(token, UtilConfig.secret, (err, decoded) => {
// 			if (!err) {
// 				req.user = decoded;
// 				next();
// 			} else {
// 				return res.json({
// 					status: 0,
// 					msg: 'Failed to authenticate token'
// 				})
// 			}
// 		})
// 	} else {
// 		return res.status(403).send({
// 			status: 0,
// 			msg: 'No access token'
// 		})
// 	}
// }