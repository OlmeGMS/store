import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ClassificationService } from '../services/classification.service';
import { Classification } from '../models/classification';


@Component({
  selector: 'classification-add',
  templateUrl: '../views/classification-add.html',
  providers: [UserService, ClassificationService]
})

export class ClassificationAddComponent implements OnInit{
  public titulo: string;
  public classification: Classification;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _classificationService: ClassificationService
  ){
    this.titulo = 'Agregar Clasificación';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.classification = new Classification('');
  }

  ngOnInit(){
    console.log('classification-add.component.ts cargado');
    //consegir el listado de los Videojuegos

  }

  onSubmit(){
    console.log(this.classification);
    this._classificationService.addClassification(this.token, this.classification).subscribe(
      response => {

        if(!response.classification){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = '¡La clasificación se ha creado correctamente!';
          this.classification = response.classification;
          this._router.navigate(['/editar-classification', response.classification._id]);
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
