'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassificationSchema = Schema({
    name: String

});


module.exports = mongoose.model('Classification', ClassificationSchema);
