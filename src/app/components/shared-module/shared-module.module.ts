import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    BarraLateralComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    BarraLateralComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class SharedModuleModule { }
