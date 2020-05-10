import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Rutas
import { ClientesRoutingModule } from './clientes-routing.module';

// Componentes
import { ClientesComponent } from './components/clientes/clientes.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';

@NgModule({
  declarations: [
    PaginadorComponent,
    ClientesComponent,
    BuscarClienteComponent,
    DetalleClienteComponent,
    FormClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class ClientesModule { }
