var pg      = require('pg');
var async   = require('async');

module.exports = function(app) {
  
  app.get('*', function(req, res) {
    // auth   : guest, user, admin
    // headers
  });
  
  var index =  require('./routes/index')(app);
  
  app.get('/', index.index);                                  // list forums
  
  app.get('/forum/:key', function(req, res) {                                     // list topics
    res.send('/forum/:key');
  });
  
  app.get('/topic/:key', function(req, res) {                                     // list messages
    res.send('/topic/:key');
  });
  
  app.get('/users', function(req, res) {                                          // list users | auth
    var users = [];
    var client = new pg.Client(process.env.DATABASE_URL);
    var query;
    client.connect(function(err) {
      if(err)
        return console.error('Could not connect to postgres', err);
    });
    query = client.query('SELECT * FROM users');
    query.on('row', function(row, result) {
      users.push(row);
    });
    query.on('end', function(result) {
      res.render('users', { 
        users: JSON.stringify(users)
      });
      client.end();
    });
  });
  
  app.get('/users/:key', function(req, res) {                                     // show user profile
    res.send('/users/:key');
  });
  
  app.get('*', index.error404);
  
};