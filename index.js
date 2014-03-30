var express = require('express');
var logfmt  = require('logfmt');
var app     = express();


app.configure(function() {
  app.set('views', __dirname +'/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname +'/public'));
});

require('./routes')(app);

app.listen(Number(process.env.PORT || 5000), function() {
  console.log('Listentning...');
});