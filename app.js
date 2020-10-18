var app = require('./config/servidor');
var port = (process.env.PORT || '8080');
app.listen(port, function () {
  console.log("Servidor ativo na porta " + port + ".");
});