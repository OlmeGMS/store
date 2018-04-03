'use strict'

var path = require('path');
var fs = require('fs');
var mongoosPaginate = require('mongoose-pagination');

//cargar modelos
var Classification = require('../models/classification');
var Videogame = require('../models/videogame');

function getVideogame(req, res) {

  var videogameId = req.params.id;
  Videogame.findById(videogameId).populate({
    path: 'classification'
  }).exec((err, videogame) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!videogame) {
        res.status(404).send({
          message: 'El videogame no existe'
        });
      } else {
        res.status(200).send({
          videogame
        });
      }
    }
  });


}

function getVideogames(req, res) {
  var videogameId = req.params.classification;
  if (!videogameId) {
    var find = Videogame.find({}).sort('name');
  } else {
    var find = Videogame.find({
      classification: classificationId
    }).sort('name');
  }

  find.populate({
    path: 'classification'
  }).exec((err, videogame) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR: No se puedo hacer la petición'
      });
    } else {
      if (!videogame) {
        res.status(404).send({
          message: 'ERROR: No hay videogames'
        });
      } else {
        res.status(200).send({
          videogame
        });
      }

    }
  });
}

function saveVideogame(req, res) {
  var videogame = new Videogame();

  var params = req.body;
  videogame.name = params.name;
  videogame.type = params.type;
  videogame.year = params.year;
  videogame.image = 'null';
  videogame.classification = params.classification;

  videogame.save((err, videogameStored) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR en el servido'
      });
    } else {
      if (!videogameStored) {
        res.status(404).send({
          message: 'ERROR: no se pudo guardar el video juego'
        });
      } else {
        res.status(200).send({
          videogame: videogameStored
        });
      }


    }
  });
}

function updateVideogame(req, res) {
  var videogameId = req.params.id;
  var update = req.body;

  Videogame.findByIdAndUpdate(videogameId, update, (err, videogameUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR en la petición'
      });
    } else {
      if (!videogameUpdated) {
        res.status(404).send({
          message: 'ERROR: No se puedo actualizar el videogame'
        });
      } else {
        res.status(200).send({
          videogame: videogameUpdated
        });
      }

    }
  });
}

function deleteVideogame(req, res) {
  var videogameId = req.params.id;

  Videogame.findByIdAndRemove(videogameId, (err, videogameRemoved) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR en la peticioón'
      });
    } else {
      if (!videogameRemoved) {
        res.status(404).send({
          message: 'El videogames no ha sido eliminado'
        });
      } else {
        Classification.find({
          videogame: videogameRemoved._id
        }).remove((err, classificationRemoved) => {
          if (err) {
            res.status(500).send({
              message: 'Error al eliminar la clasiificación'
            });
          } else {
            if (!classificationRemoved) {
              res.status(404).send({
                message: 'La clasificación no ha sido elimindada'
              });
            } else {
              res.status(200).send({
                videogame: videogameRemoved
              });
            }
          }
        });


      }

    }
  });
}

function uploadImage(req, res) {
  var videogameId = req.params.id;
  var file_name = 'No ha subido imagen...';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];

    // recoger la extencion de la imagen
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext || 'jpg' ||
      file_ext == 'gif') {
      Videogame.findByIdAndUpdate(videogameId, {
        image: file_name
      }, (err, videogameUpdated) => {
        if (!videogameId) {
          res.status(404).send({
            message: 'No se ha podido actualizar el videogame'
          });
        } else {
          res.status(200).send({
            videogame: videogameUpdated
          });
        }
      });
    } else {
      res.status(200).send({
        message: 'La extensión del archivo noes valido'
      });
    }
  } else {
    res.status(200).send({
      message: 'No se ha subido ninguna imagen'
    });
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/videogames/' + imageFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({
        message: 'No existe la imagen'
      });
    }
  });
}

module.exports = {
  getVideogame,
  getVideogames,
  saveVideogame,
  updateVideogame,
  deleteVideogame,
  uploadImage,
  getImageFile

};
