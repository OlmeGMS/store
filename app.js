'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//ruta base

app.get('/pruebas', function(req, res){
    res.status(200).send({message: 'Bienvenido a la tienda videogames'});
})

module.exports = app;
