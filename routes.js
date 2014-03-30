
module.exports = function(app) {
  
  app.get('*', function(req, res) {
    // auth
    // headers
  });

  app.get('/', require('./routes/index'));
  
  app.get('/', function(req, res) {
    res.render('index', { 
      pageTitle: 'Node Forum'
    });
  });

  app.get('/users', function(req, res) {
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
  
};