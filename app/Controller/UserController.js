var UserHandler = require('../Handler/UserHandler'),
    ResponseUtil = require('../Util/ResponseUtil')


module.exports = {

  register: (req, res) => {
    let username = req.body.username || undefined;
    let password = req.body.password || undefined;
    let email = req.body.email || undefined;
    let dob = req.body.dob || undefined;
    let role = req.body.role || undefined;
    let fullname = req.body.fullname || undefined;
    let major = req.body.major || undefined;
    let phone = req.body.phone || undefined;
    let avt = req.body.avt || undefined;
    let rfid = req.body.rfid || undefined;
    let description = req.body.description || undefined;
    let user = {
      username: username,
      password: password,
      role: role,
      details: {
        fullname: fullname,
        major: major,
        email: email,
        dob: new Date(parseInt(dob)),
        phone: phone,
        avt: avt,
        rfid: rfid,
        description: description
      }
    };
    UserHandler.register(user).then(data => {
      res.json({
        status: 1,
        user: data
      });
    }).catch(err => {
      res.json(ResponseUtil.err(err))
    });
  },

  login: (req, res) => {
    let username = req.body.username || undefined;
    let password = req.body.password || undefined;
    let user = {
      username: username,
      password: password
    };
    UserHandler.login(user).then(data => {
      res.json(data);
    }).catch(err => {
      res.json(ResponseUtil.err(err));
    })
  }
}