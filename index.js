var express = require('express');
var logfmt  = require('logfmt');
var pg      = require('pg');

var app = express();

var DATABAS_URL = 'postgres://kordnmeitzjojc:8LiraiRea-VUnjIWkSWoMYno-3@ec2-54-197-237-171.compute-1.amazonaws.com:5432/detcve4tb7vbg8';

app.configure(function() {
  app.set('views', __dirname +'/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname +'/public'));
});

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.render('index', { 
    pageTitle: 'Basic NodeJS Forum'
  });
});

app.get('/users', function(req, res) {
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM users', function(err, result) {
      done();
      if(err)
        return console.error(err);
      console.log(result.rows);
    });
  });
  res.send('users');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listentning on '+ port);
});