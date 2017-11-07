var http          = require('http'),
    path          = require('path'), 
    mosca         = require('mosca'), 
    express       = require('express'), 
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser')
    ;
    
var app           = express(), 
    router        = express.Router(),
    httpServ      = http.createServer(app), 
    mqttServ      = new mosca.Server({})
    ;
    
var PORT = process.env.PORT || 3000,
    BaseRoute = require('./app/Route/BaseRoute'),
    RoomRoute = require('./app/Route/RoomRoute'),
    ShiftRoute = require('./app/Route/ShiftRoute'),
    SubjectRoute = require('./app/Route/SubjectRoute'),
    ClassRoute = require('./app/Route/ClassRoute'),
    ClassDetailRoute = require('./app/Route/ClassDetailRoute')
    ChairRoute = require('./app/Route/ChairRoute')
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

mqttServ.on('clientConnected', (client) => {
  console.log('client connected', client.id);
});

mqttServ.on('published', (packet, client) => {
  console.log(packet);
});


var authenticate = (client, username, password, callback) => {
  var authorized = (username === 'alice' && password.toString() === 'secret');
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

