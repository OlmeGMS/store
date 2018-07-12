import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Classification } from '../models/classification';

@Injectable()
export class ClassificationService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getClassifications(token, page){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'classifications/'+page, options)
                     .map(res => res.json());

  }

  getClassification(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'classification/'+id, options)
                     .map(res => res.json());

  }

  addClassification(token, classification: Classification){
    let params = JSON.stringify(classification);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this._http.post(this.url+'classification', params, {headers: headers})
                     .map(res => res.json());
  }

  editClassification(token, id: string, classification: Classification){
    let params = JSON.stringify(classification);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this._http.put(this.url+'classification/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteClassification(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'classification/'+id, options)
                     .map(res => res.json());

  }
}
