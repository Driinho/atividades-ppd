var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var middleware = require('./middleware'); // Importa o middleware.js
var routes = require('./routes'); // Importa o routes.js

var app = express();
var server = http.createServer(app).listen(4555); // Cria um servidor HTTP e o faz escutar na porta 4555
var io = socketIO.listen(server); // Cria uma instância do Socket.io e a conecta ao servidor

var port = process.env.PORT || 8080; // Define a porta padrão como 8080 caso não seja fornecida via variável de ambiente

middleware(app, io); // Aplica os middlewares
app.use('/api', routes); // Define a rota base '/api' para o roteador

// Inicia o servidor na porta definida
app.listen(port, function () {
    console.log('Conectado à porta ' + port);
});