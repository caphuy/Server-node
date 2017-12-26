'use strict';

const Model = require('../Model/Models'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      UtilConfig = require('../Config/UtilConfig'),
      BaseUtil = require('../Util/BaseUtil')

      
const saltRounds = 10;


module.exports = {

  async register(user) {
    if (user.username === undefined || user.password === undefined) {
      return 'lack of info';
    } else {
      let passwordHash = bcrypt.hashSync(user.password, saltRounds);
      let newUser = Object.assign({}, user);
      newUser.password = passwordHash;
      return await Model.user.create(newUser);
    }
  },

  async login(user) {
    if (user.username === undefined || user.password === undefined) {
      return {
        status: 0,
        msg: 'lack of info',
        user: null
      }
    } else {
      let userFinded = await this.getUserByUsername(user.username);
      if (userFinded !== undefined && userFinded !== null) {
        let compare = bcrypt.compareSync(user.password, userFinded.password);
        if (compare === true) {
          let token = await jwt.sign({
            data: userFinded,
            exp: Math.floor(BaseUtil.NOW_SEC) + UtilConfig.TOKEN_EXP_SEC,
          }, UtilConfig.SECRET);
          return {
            status: 1,
            token: token,
            user: userFinded,
            msg: null
          };
        } else {
          return {
            status: 0,
            msg: 'wrong password',
            user: null
          };
        }
      } else {
        return {
          status: 0,
          msg: 'user invalid',
          user: null
        };
      }
    }
  },

  getUserByUsername(username) {
    return Model.user.findOne({username: username});
  },

  getUserByRfid(rfid) {
    return Model.user.findOne({"details.rfid": rfid});
  },

}