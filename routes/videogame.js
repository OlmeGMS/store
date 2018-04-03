'use strict'

var express = require('express');
var VideogameController = require('../controllers/videogame');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//subir ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/videogames'});

api.get('/videogame/:id', md_auth.ensureAuth, VideogameController.getVideogame);
api.post('/videogame', md_auth.ensureAuth, VideogameController.saveVideogame);
api.get('/videogames/:classification?', md_auth.ensureAuth, VideogameController.getVideogames);
api.put('/videogame/:id', md_auth.ensureAuth, VideogameController.updateVideogame);
api.delete('/videogame/:id', md_auth.ensureAuth, VideogameController.deleteVideogame);
api.post('/upload-image-videogame/:id', [md_auth.ensureAuth, md_upload], VideogameController.uploadImage);
api.get('/get-image-videogame/:imageFile', VideogameController.getImageFile);

module.exports = api;
