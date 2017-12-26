'use strict'

const UserHanlder = require('./UserHandler'),
      ChairHandler = require('./ChairHandler'),
      Buffer = require('buffer').Buffer

module.exports = {

  onPublished: async (mqttServ, packet, client) => {
    if (packet.topic === 'chairUpdate') {
      let payload = JSON.parse(packet.payload.toString());
      let data = await ChairHandler.calculateLocation(payload);
      mqttServ.publish({
        cmd: 'publish',
        qos: 2,
        topic: data.roomId + '_smooth',
        payload: new Buffer(JSON.stringify(data.listChairsPublish)),
        retain: false
      });
      mqttServ.publish({
        cmd: 'publish',
        qos: 2,
        topic: data.roomId + '_nosmooth',
        payload: new Buffer(JSON.stringify(data.chairPublish)),
        retain: false
      });
    }
  }
}
