'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var classification_routes = require('./routes/classification');
var videogames_routes = require('./routes/videogame');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Se permite el acceso a todos los dominios
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); //cabecera ajax
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // metodos http
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});
//ruta base
app.use('/api', user_routes);
app.use('/api', classification_routes);
app.use('/api', videogames_routes);

app.get('/pruebas', function(req, res) {
  res.status(200).send({
    message: 'Bienvenido a la tienda videogames'
  });
})

module.exports = app;
