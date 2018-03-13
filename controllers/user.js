'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');


function pruebas(req, res){
  res.status(200).send({
    message: 'Probando una acción del controlador de usuarios del api rest con NodeJS y MongoDB'
  });
}

function saveUser(req, res){
  var user = new User();
  var params = req.body;

  console.log(params);

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null';

  if(params.password){
      //Encriptar  contraseña del usuario
      bcrypt.hash(params.password, null, null, function(err, hash){
           user.password = hash;
           if(user.name != null && user.surname != null && user.email != null){
             //Guardar el usuario
             user.save((err, userStored) => {
               if(err){
                 res.status(500).send({message: 'Error al guardar al usuario'});
               }else {
                 if(!userStored){
                   res.status(404).send({message: 'No se ha registrado el usuario'});
                 }else{
                   res.status(200).send({user: userStored});
                 }
               }
             });

           }else{
             res.status(200).send({message: 'Diligencia todos los campos'});
           }
      });

  }else{
    res.status(200).send({message: 'introduce la contraseña'});
  }

}

module.exports = {
  pruebas,
  saveUser
};
