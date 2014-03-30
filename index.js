var express = require('express');
var logfmt  = require('logfmt');
// var everyauth = require('everyauth');    // twitter, facebook, google+ ...etc, login
var app     = express();


app.configure(function() {
  app.set('views', __dirname +'/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secret key'));
  app.use(express.cookieSession());
  app.use(app.router);
  app.use(express.static(__dirname +'/public'));
  // app.use(everyauth.middleware(app));
});

require('./routes')(app);

app.listen(Number(process.env.PORT || 5000), function() {
  console.log('Listentning...');
});