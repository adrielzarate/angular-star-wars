import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IdComponent } from './pages/id/id.component';
import { IdGuard } from './pages/id/id.guard';
import { InnerComponent } from './pages/inner/inner.component';
import { PlanetsGuard } from './pages/planets/planets.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [PlanetsGuard],
    component: HomeComponent,
    children: [
      {
        path: 'inner',
        component: InnerComponent
      },
    ]
  },
  // {
  //   path: 'planets',
  //   component: PlanetsComponent
  // },
  // {
  //   path: 'characters',
  //   canActivate: [CharactersGuard],
  //   loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule)
  // },
  {
    path: ':id',
    canActivate: [IdGuard],
    component: IdComponent,
    children: [
      {
        path: 'inner',
        component: InnerComponent
      },
    ]
  },
  // {
  //   path: 'films',
  //   loadChildren: () => import('./pages/films/films.module').then(m => m.FilmsModule)
  // },
  // {
  //   path: '404',
  //   loadChildren: () => import('./pages/notfound/notfound-routing.module').then(m => m.NotfoundModuleRoutingModule)
  // },
  {
    path: '**',
    // redirectTo: '/404'
    loadChildren: () => import('./pages/notfound/notfound-routing.module').then(m => m.NotfoundModuleRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
