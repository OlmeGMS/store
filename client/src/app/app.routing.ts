import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
//import user
import { UserEditComponent } from './components/user-edit.component';
//import classification
import { ClassificationListComponent } from './components/classification-list.component';
import { ClassificationAddComponent } from './components/classification-add.component';
import { ClassificationEditComponent } from './components/classification-edit.component';

//import videogame
import { VideogameListComponent } from './components/games-list.component';
import { VideogameAddComponent } from './components/games-add.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'classifications/:page', component: ClassificationListComponent},
  {path: 'crear-classification', component: ClassificationAddComponent},
  {path: 'editar-classification/:id', component: ClassificationEditComponent},
  {path: 'videogames/:page', component: VideogameListComponent},
  {path: 'crear-videogame', component: VideogameAddComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: HomeComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
