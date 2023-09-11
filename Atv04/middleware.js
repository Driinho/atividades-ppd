var bodyParser = require('body-parser');

module.exports = function (app, io) {
    // Configura o uso do bodyParser para analisar os corpos das requisições
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Middleware para emitir notificações via Socket.io
    var emitir = function (req, res, next) {
        var notificar = req.query.notificacao || '';
        if (notificar != '') {
            io.emit('notificacao', notificar); // Emite uma notificação via Socket.io
        }
        next(); // Passa para o próximo middleware
    }

    app.use(emitir); // Utiliza o middleware de emissão de notificações
};