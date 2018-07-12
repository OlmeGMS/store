'use strict'

var path = require('path');
var fs = require('fs');
//modulo de paginación
var mongoosPaginate = require('mongoose-pagination');

var Classification = require('../models/classification');

function getClassification(req, res) {
  //recoger la id de la clasificacion por url
  var classificationId = req.params.id;

  //buscar la clasificafion por id
  Classification.findById(classificationId, (err, classification) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!classification) {
        res.status(400).send({
          message: 'La clasifición no exite'
        });
      } else {
        res.status(200).send({
          classification
        })
      }
    }
  });
}

//listar clasificacion
function getClassifications(req, res) {
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }
  var itemsPerPage = 4;
  Classification.find().sort('name').paginate(page, itemsPerPage, function(err, classifications, total) {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!classifications) {
        res.status(400).send({
          message: 'No hay Classifiaciones'
        });
      } else {
        return res.status(200).send({
          total_items: total,
          classifications: classifications
        });
      }
    }
  });
}

function saveClassification(req, res) {
  var classification = new Classification();
  var params = req.body;

  classification.name = params.name;

  classification.save((err, classificationStored) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR: No se pudo guardar la clasificacion'
      });
    } else {
      if (!classification) {
        res.status(404).send({
          message: 'La clasificación no pudo ser guardada'
        });
      } else {
        res.status(200).send({
          classification: classificationStored
        });
      }
    }
  });

}

function updateClassification(req, res) {
  var classificationId = req.params.id;
  var update = req.body;

  Classification.findByIdAndUpdate(classificationId, update, (err, classificationUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'ERROR: en la petición'
      });
    } else {
      if (!classificationUpdated) {
        res.status(404).send({
          message: 'No se puedo actualizar la clasificación'
        });
      } else {
        res.status(200).send({
          classification: classificationUpdated
        });
      }
    }
  });
}

function deleteClassification(req, res){
  var classificationId = req.params.id;

  Classification.findByIdAndRemove(classificationId, (err, classificationRemoved) => {
    if(err){
      res.status(500).send({message: 'ERROR en la petición'});
    }else{
      if(!classificationRemoved){
        res.status(404).send({message: 'ERROR: No se pudo eliminar la clasificación'});
      }else{
        res.status(200).send({classification: classificationRemoved});
      }
    }
  });
}

module.exports = {
  getClassification,
  getClassifications,
  saveClassification,
  updateClassification,
  deleteClassification
};
