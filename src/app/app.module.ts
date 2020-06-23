import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModuleModule } from './components/shared-module/shared-module.module';
import { UsuariosModule } from './components/usuarios/usuarios.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,   
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModuleModule,
    UsuariosModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
