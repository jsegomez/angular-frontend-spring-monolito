import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BarraLateralComponent } from './components/shared/barra-lateral/barra-lateral.component';
import { AppRoutingModule } from './app-routing.module';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    BarraLateralComponent,
    FormClientesComponent,
    DetalleClienteComponent,
    BuscarClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
