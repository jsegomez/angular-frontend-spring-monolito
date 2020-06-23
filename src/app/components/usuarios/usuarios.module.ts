import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Rutas
import { UsuariosRoutingModule } from './usuarios-routing.module';

// Componentes
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ]   
})
export class UsuariosModule { }
