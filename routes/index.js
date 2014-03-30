var index = { };

index.index = function(req, res) {
  res.render('index', { 
    pageTitle: 'Node Forum'
  });
};

index.login = function(req, res) {
  
};

index.signup = function(req, res) {
  
};

index.error404 = function(req, res) {
  
};

module.exports = index;
  