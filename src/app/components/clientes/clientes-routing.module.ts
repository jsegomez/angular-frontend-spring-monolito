import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';


const routes: Routes = [
  { path: 'pagina/:id',                 component:  ClientesComponent        },
  { path: 'detalle/:id',      component:  DetalleClienteComponent  },
  { path: 'buscar',           component:  BuscarClienteComponent   },
  { path: 'formulario',       component:  FormClientesComponent    },
  { path: 'formulario/:id',   component:  FormClientesComponent    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
