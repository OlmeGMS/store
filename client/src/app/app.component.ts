import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'StoreGames';
  public user: User;
  public identity;
  public token;

  constructor(){
    this.user = new User('','','','','','ROLE_USER','');
  }

  public onSubmit(){
    console.log(this.user); 
  }
}
