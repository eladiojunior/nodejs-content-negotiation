const routes = function (app) {

  app.get('/', function (req, res) {
    res.format({
      html: function () {
        res.render('index', {title: 'Content Negotiation'});
      },
      json: function () {
        var result = {
          body: 'Bem vindo a sua APP Node Js - Content Negotiation!'
        }
        res.json(result);
      }
    });
  });

  app.post('/', function (req, res) {
    var dados = req.body;
    res.send(dados);
  });

};
module.exports = routes;
