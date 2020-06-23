import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: String = 'Inicio de sesión';
  usuario: Usuario; 

  constructor(private router: Router, private authService: AuthService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(formulario: NgForm): void{
    this.authService.login(this.usuario).subscribe(response =>{                      
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.acces_token);
      let usuario = this.authService.usuario;
      let token = this.authService.token;
      this.router.navigate(['/home']);
    })
  }
}


