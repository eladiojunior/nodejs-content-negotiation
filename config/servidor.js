var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var consign = require('consign');

var app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('app/public'));

/* Efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

// Tratamento de erros do cliente, exemplo 404
app.use(function(req, res, next) {
    res.status(400).render('errors/404');
    next();
});

// Tratamento de erros do servidor, exemplo 500
app.use(function(err, req, res, next) {
    //Setar informações e verificar se estamos em Dev ou não.
    var ambiente = process.env.AMBIENTE
    if (ambiente == undefined)
        ambiente = req.app.get('env');
    console.log('Ambiente: ' + ambiente);
    // Enviar para página de erro.
    res.status(500).render('errors/500', {erro : (ambiente === 'development') ? err : null});
    next();
});

module.exports = app;