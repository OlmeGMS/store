import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Videogame } from '../models/videogame';

@Component({
  selector: 'videogames-list',
  templateUrl: '../views/videogames-list.html',
  providers: [UserService]
})

export class VideogameListComponent implements OnInit{
  public titulo: string;
  public videogames: Videogame[];
  public identity;
  public token;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.titulo = 'Videojuegos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('games-list.component.ts cargado');
    //consegir el listado de los Videojuegos
  }
}
