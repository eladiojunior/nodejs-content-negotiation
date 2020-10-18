var http = require('http');

var opcoes_request = {
    hostname: "localhost",
    port: 8080,
    path: '/',
    method: 'get',
    headers: {
        'Accept': 'text/html',
        'Content-type': 'application/x-www-form-urlencoded'
        //'Accept': 'application/json',
        //'Content-type': 'application/json'
    }
}

//Content-type
//x-www-form-urlencoded - Informações de formulário HTML <form>
var input_form_html = 'nome=HTML Eladio Júnior';
var input_form_json = {nome: "JSON Eladio Júnior"};

//Requisição
var buffer_response = [];
var req = http.request(opcoes_request, function (res) {
    //Data, recupera as informações da requisição...
    res.on('data', function (parte_data) {
        buffer_response.push(parte_data);
    });
    //End, finalização do carregamento da requisição...
    res.on('end', function (){
        var string_response = Buffer.concat(buffer_response).toString();
        console.log(string_response);
    });
    //Error, recebe o erro da requisição...
    res.on('error', function (err){
       console.log('ERRO:: ' + err.code);
    });

});

//Enviar dados - HTML
//req.write(input_form_html);

//Enviar dados - JSON
//Precisa converter para String o Json.
var string_input_form_json = JSON.stringify(input_form_json);
req.write(string_input_form_json);

//Executar requisição
req.end();