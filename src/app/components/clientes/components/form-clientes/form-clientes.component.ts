import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {

  constructor(
    private servicioCliente: ClienteService,
    private router: Router,
    private idRuta: ActivatedRoute
  ) { }

  cliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.cargarCliente();
  }

  // Carga un cliente por ID en ruta URL
  cargarCliente(): void{
    this.idRuta.params.subscribe(
      params => {
        const id = params.id;
        if(id){
          this.servicioCliente.getCliente(id).subscribe(
            cliente => this.cliente = cliente
          )
        }
      }
    )
  }

  // Método para actualizar un cliente
  update(formulario: NgForm){
    if(formulario.invalid){
      Object.values(formulario.controls).forEach(
        control => {
          control.markAllAsTouched()
        }
      )
      return;
    }

    this.servicioCliente.update(this.cliente).subscribe(
      respuesta => {
        this.router.navigate([`clientes/detalle/${respuesta.cliente.id}`]);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Cliente ${respuesta.cliente.nombre} actualizado con éxito`,
          showConfirmButton: true,
          timer: 2500
        });
      }
    )
  }

  // Método para crear un cliente nuevo
  create(formulario: NgForm): void{
    if(formulario.invalid){
      Object.values(formulario.controls).forEach(
        control => {
          control.markAllAsTouched()
        }
      )
      return;
    }

    this.servicioCliente.create(this.cliente).subscribe(
      respuesta => {
        this.router.navigate(['/clientes/detalle/', respuesta.cliente.id]);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Cliente ${respuesta.cliente.nombre} registrado con éxito`,
          showConfirmButton: true,
          timer: 2500
        })
      }
    )
  }

}
