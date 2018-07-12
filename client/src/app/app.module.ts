import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { ClassificationListComponent } from './components/classification-list.component';
import { ClassificationAddComponent } from './components/classification-add.component';
import { ClassificationEditComponent } from './components/classification-edit.component';
import { VideogameListComponent } from './components/games-list.component';
import { VideogameAddComponent } from './components/games-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ClassificationListComponent,
    ClassificationAddComponent,
    ClassificationEditComponent,
    VideogameListComponent,
    VideogameAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
