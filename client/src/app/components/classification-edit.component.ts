import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { ClassificationService } from '../services/classification.service';
import { Classification } from '../models/classification';


@Component({
  selector: 'classification-edit',
  templateUrl: '../views/classification-add.html',
  providers: [UserService, ClassificationService, UploadService]
})

export class ClassificationEditComponent implements OnInit {
  public titulo: string;
  public classification: Classification;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;
  public filesToUpload: Array<File>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _classificationService: ClassificationService
  ) {
    this.titulo = 'Editar Clasificación';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.classification = new Classification('');
    this.is_edit = true;
  }

  ngOnInit() {
    console.log('classification-edit.component.ts cargado');
    //llamar al metodo del api para sacar el metodo por id
    this.getClassification();
  }

  getClassification() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._classificationService.getClassification(this.token, id).subscribe(
        response => {

          if (!response.classification) {
            this._router.navigate(['/']);
          } else {
            this.classification = response.classification;
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

  onSubmit() {
    console.log(this.classification);
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._classificationService.editClassification(this.token, id, this.classification).subscribe(
        response => {

          if (!response.classification) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = '¡La clasificación se ha actualizado correctamente!';
            //this.classification = response.classification;
            //this._router.navigate(['/editar-videogame'], response.videogame._id);
          }

        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    
  }
}
