module.export = function() {
  return {
    index: function(req, res) {
      res.render('index', { 
        pageTitle: 'Node Forum'
      });
    },
    error404: function(req, res) {
      res.send('404 Not Found!');
    }
  };
};