import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { VideogameService } from '../services/videogame.service';
import { Videogame } from '../models/videogame';


@Component({
  selector: 'videogames-add',
  templateUrl: '../views/videogames-add.html',
  providers: [UserService, VideogameService]
})

export class VideogameAddComponent implements OnInit{
  public titulo: string;
  public videogame: Videogame;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videogameService: VideogameService
  ){
    this.titulo = 'Agregar Videojuegos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.videogame = new Videogame('','',2018,'','');
  }

  ngOnInit(){
    console.log('games-add.component.ts cargado');
    //consegir el listado de los Videojuegos
    

  }

  onSubmit(){
    console.log(this.videogame);
    this._videogameService.addVideogame(this.token, this.videogame).subscribe(
      response => {

        if(!response.videogame){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = '¡El video juego se ha creado correctamente!';
          this.videogame = response.videogame;
          //this._router.navigate(['/editar-videogame'], response.videogame._id);
        }

      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }
      }
    );
  }
}
