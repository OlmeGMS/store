'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/videogames', (err, res) => {
  if(err){
      throw err;
  }else{
      console.log("La conexion a la base de datos esta corriendo correctamente");

      app.listen(port, function(){
        console.log("Servidor de tienda videogames escuchanho en http://localhost:"+port);

      });
  }
});
