const http          = require('http'),
      path          = require('path'), 
      mosca         = require('mosca'), 
      express       = require('express'), 
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser')
      ;
    
const app           = express(), 
      router        = express.Router(),
      httpServ      = http.createServer(app), 
      mqttServ      = new mosca.Server({})
      ;
    
const PORT = process.env.PORT || 3000,
      BaseRoute = require('./app/Route/BaseRoute'),
      RoomRoute = require('./app/Route/RoomRoute'),
      ShiftRoute = require('./app/Route/ShiftRoute'),
      SubjectRoute = require('./app/Route/SubjectRoute'),
      ClassRoute = require('./app/Route/ClassRoute'),
      ClassDetailRoute = require('./app/Route/ClassDetailRoute'),
      ChairRoute = require('./app/Route/ChairRoute'),
      SettingRoute = require('./app/Route/SettingRoute'),
      UserRoute = require('./app/Route/UserRoute'),
      CalendarRoute = require('./app/Route/CalendarRoute'),
      LikeRoute = require('./app/Route/LikeRoute'),
      PointRoute = require('./app/Route/PointRoute'),
      ClasslogRoute = require('./app/Route/ClasslogRoute')
      MQTTHandler = require('./app/Handler/MQTTHandler')
      ;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SmartClassroom', {
  useMongoClient: true,
  /* other options */
}),

/*
  Basic settings
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.dirname(require.resolve('mosca')) + '/public'))

/*
  Route settings
*/
app.use('/', BaseRoute);
app.use('/room', RoomRoute);
app.use('/shift', ShiftRoute);
app.use('/subject', SubjectRoute);
app.use('/class', ClassRoute);
app.use('/classdetail', ClassDetailRoute);
app.use('/chair', ChairRoute);
app.use('/setting', SettingRoute);
app.use('/user', UserRoute);
app.use('/calendar', CalendarRoute);
app.use('/like', LikeRoute);
app.use('/point', PointRoute);
app.use('/classlog', ClasslogRoute);

mqttServ.on('clientConnected', (client) => {
  // console.log('client connected', client.id);
});

mqttServ.on('published', (packet, client) => {
  MQTTHandler.onPublished(mqttServ, packet, client);
});

const authenticate = (client, username, password, callback) => {
  var authorized = (username === 'seoeian' && password.toString() === 'secret');
  if (authorized) client.user = username;
  callback(null, authorized);
};

function setup() {
  mqttServ.authenticate = authenticate;
  // server.authorizePublish = authorizePublish;
  // server.authorizeSubscribe = authorizeSubscribe;
  console.log('MQTT server is listen on port ' + 1883);
}

mqttServ.on('ready', setup);

mqttServ.attachHttpServer(httpServ);
httpServ.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT)
});

