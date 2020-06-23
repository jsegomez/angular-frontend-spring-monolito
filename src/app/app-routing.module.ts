import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';

// Componentes
const routes: Routes = [    
  {
    path: '', 
    component: LayoutComponent,
    children:[
      { path: 'home',     component: HomeComponent },
    ]
  },  
  {
    path: 'clientes',
    loadChildren: () => import('./components/clientes/clientes.module')
    .then(module => module.ClientesModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./components/usuarios/usuarios.module')
    .then(module => module.UsuariosModule)
  },
  // {path: '**', pathMatch: 'full', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
