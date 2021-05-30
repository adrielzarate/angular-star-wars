import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsComponent } from './pages/planets/planets.component';


const routes: Routes = [
  {
    path: '',
    component: PlanetsComponent
  },
  {
    path: 'planets',
    component: PlanetsComponent
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'films',
    loadChildren: () => import('./pages/films/films.module').then(m => m.FilmsModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/notfound/notfound-routing.module').then(m => m.NotfoundModuleRoutingModule)
  },
  {
    path: '**',
    redirectTo: '404'
    // loadChildren: () => import('./pages/notfound/notfound-routing.module').then(m => m.NotfoundModuleRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
