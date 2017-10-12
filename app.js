var http     = require('http')
    , express = require('express')
    , app = express()
    , httpServ = http.createServer(app)
    , mosca    = require('mosca')
    , mqttServ = new mosca.Server({})
    , path = require('path')
    , mongoose = require('mongoose')
    , Models = require('./app/Models/Models')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Test', {
  useMongoClient: true,
  /* other options */
}),

mqttServ.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
mqttServ.on('published', function(packet, client) {
  console.log(packet);
  // if (packet.topic == 'updateloc') {
  //   let data = JSON.parse(packet.payload.toString());
  //   Models.rssi2.create({
  //     r1: data.r1,
  //     r2: data.r2,
  //     r3: data.r3
  //   }).then(data => {
  //     console.log(data);
  //   })
  // }
});

mqttServ.on('ready', () => {
  console.log('MQTT server is listen on port ' + 1883);
});

mqttServ.attachHttpServer(httpServ);
app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/a.html'));
})

httpServ.listen(3000);

