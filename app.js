'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var classification_routes = require('./routes/classification');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//configurar cabeceras http

//ruta base
app.use('/api', user_routes);
app.use('/api', classification_routes);

app.get('/pruebas', function(req, res) {
  res.status(200).send({
    message: 'Bienvenido a la tienda videogames'
  });
})

module.exports = app;
