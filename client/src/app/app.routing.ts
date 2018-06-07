import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import videogame
import { VideogameListComponent } from './components/games-list.component';

const appRoutes: Routes = [
  {path: '', component: VideogameListComponent},
  {path: 'videogames/:page', component: VideogameListComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: VideogameListComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
