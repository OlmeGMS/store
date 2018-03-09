'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideogameSchema = Schema({
    name: String,
    type: String,
    year: Number,
    image: String,
    classification: { type: Schema.ObjectId, ref: 'Classification'}

});


module.exports = mongoose.model('Videogame', VideogameSchema);
