import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '',                        component:  HomeComponent            },
  {
    path: 'clientes',
    loadChildren: () => import('./components/clientes/clientes.module')
    .then(module => module.ClientesModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
