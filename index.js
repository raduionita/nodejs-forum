var express = require('express');
var logfmt  = require('logfmt');

var app = express();

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

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listentning on '+ port);
});