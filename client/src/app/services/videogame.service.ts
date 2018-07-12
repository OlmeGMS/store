import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Videogame } from '../models/videogame';

@Injectable()
export class VideogameService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  addVideogame(token, videogame: Videogame){
    let params = JSON.stringify(videogame);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this._http.post(this.url+'videogame', params, {headers: headers})
                     .map(res => res.json());
  }
}
