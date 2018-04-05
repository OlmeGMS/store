'use strict'
var express = require('express');
var ClassificationController = require('../controllers/classification');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/classification/:id', md_auth.ensureAuth, ClassificationController.getClassification);
api.post('/classification', md_auth.ensureAuth, ClassificationController.saveClassification);
api.get('/classifications/:page?', md_auth.ensureAuth, ClassificationController.getClassifications);
api.put('/classification/:id', md_auth.ensureAuth, ClassificationController.updateClassification);
api.delete('/classification/:id', md_auth.ensureAuth, ClassificationController.deleteClassification);


module.exports = api;
