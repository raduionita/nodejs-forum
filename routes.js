var pg      = require('pg');
var async   = require('async');

module.exports = function(app) {
  
  app.get('*', function(req, res) {
    // auth   : guest, user, admin
    // headers
  });
  
  app.get('/', require('./routes/index').index);                                  // list forums
  app.post('/login',  require('./routes/index').login);
  app.post('/signup', require('./routes/index').signup);
  
  app.get('/forum/:key', forum.index);                                            // list topics
  app.post('/forum/:key', auth, forum.create);                                    // create topics
  app.del('/forum/:key', auth, forum.delete);
  
  app.get('/topic/:key', topic.index);                                            // list messages
   
  
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
  
  app.get('*', function(req, res) {
    res.send('404 Not Found!');
  });
  
};