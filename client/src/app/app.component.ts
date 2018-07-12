import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'StoreGames';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit() {
    console.log(this.user);
    // conseguir los datos del usuario indentificado
    this._userService.singup(this.user).subscribe(
      response => {
        let identity =  response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no está correctamente indentificado");
        }else{
          // crear elemento en el local storage
          localStorage.setItem('identity', JSON.stringify(identity));

          //conseguir el token para enviarlo en cada petición
          this._userService.singup(this.user, 'true').subscribe(
                response => {
                  let token =  response.token;
                  this.token = token;

                  if(this.token.length <= 0){
                    alert("El token no se ha generado correctamente");
                  }else{
                    // crear elemento en el local storage para tener un token disponible
                    localStorage.setItem('token', token);
                    // lmpiar el formulario del registro
                    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                  }
                  console.log(response);
                },
                error => {
                  var errorMessage = <any>error;

                  if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                    console.log(error);
                  }
                }
          );
        }
        console.log(response);
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }

  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro exitoso, identificate con '+this.user_register.email;
          //vaciar formulario
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}
