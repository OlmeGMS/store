import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ClassificationService } from '../services/classification.service';
import { Classification } from '../models/classification';

@Component({
  selector: 'classification-list',
  templateUrl: '../views/classification-list.html',
  providers: [UserService, ClassificationService]
})

export class ClassificationListComponent implements OnInit{
  public titulo: string;
  public classifications: Classification[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _classificationService: ClassificationService,
    private _userService: UserService
  ){
    this.titulo = 'Clasificación';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
  }

  ngOnInit(){
    console.log('classification-list.component.ts cargado');
    //consegir el listado de los Videojuegos
    this.getClassifications();
  }

  getClassifications(){
    this._route.params.forEach((params: Params) => {
      let page = +params['page']; // el mas convierte el número
      if(!page){
          page = 1;
      }else{
          this.next_page = page+1;
          this.prev_page = page-1;
          if(this.prev_page == 0){
            this.prev_page = 1; // para que la paginacion no sea menor a 0
          }
      }

      this._classificationService.getClassifications(this.token, page).subscribe(
        response => {
          if(!response.classifications){
            this._router.navigate(['/']);
          }else{
            this.classifications = response.classifications;
          }
        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.alertMessage = body.message;
            console.log(error);
          }
        }
      );

    });
  }
}
