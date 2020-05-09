import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';

const routes: Routes = [
  { path: '',                 component:  HomeComponent            },
  { path: 'clientes',         component:  ClientesComponent        },
  { path: 'formulario',       component:  FormClientesComponent    },
  { path: 'formulario/:id',   component:  FormClientesComponent    },
  { path: 'detalle/:id',      component:  DetalleClienteComponent  },
  { path: 'buscar',           component:  BuscarClienteComponent   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
