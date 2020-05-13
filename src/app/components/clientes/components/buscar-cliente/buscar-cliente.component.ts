import { Cliente } from '../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../services/clientes.service';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {

  clientes         : Cliente[] = [];
  idCliente        : number;
  nombreCliente    : string;
  apellidoCliente  : string;
  correoCliente    : string;
  mensaje          : string;
  resultado        = false;

  constructor(private servicioCliente: ClienteService) { }

  ngOnInit(): void {
  }

  buscarPorId(id: number){
    this.servicioCliente.getCliente(id).subscribe(
      cliente => {
        this.resultado = true;
        this.clientes = [];
        this.clientes.push(cliente);
        this.idCliente = null;
      }
    )
  }

  buscarPorNombres(nombre: string){
    this.servicioCliente.buscarPorNombres(nombre).subscribe(
      respuesta => {
        this.nombreCliente = '';
        this.mensaje = respuesta.mensaje;
        this.nombreCliente = '';
        this.clientes = respuesta.clientes
      }
    )
  }

  buscarPorApellidos(apellidos: string){
    this.servicioCliente.buscarPorApellidos(apellidos).subscribe(
      respuesta => {
        this.resultado = true;
        this.mensaje = respuesta.mensaje
        this.clientes = respuesta.clientes
        this.apellidoCliente = '';
      }
    )
  }

  buscarPorEmail(correo: string){
    this.servicioCliente.buscarPorEmail(correo).subscribe(
      respuesta => {
        this.resultado = true;
        this.mensaje = respuesta.mensaje
        this.clientes = respuesta.clientes
        this.correoCliente = '';
      }
    )
  }

  eliminarCliente(cliente: Cliente){
    Swal.fire({
      title: `Seguro desea eliminar cliente ${cliente.nombre} ${cliente.apellido}`,
      text: 'Una vez eliminado no se puede recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      this.servicioCliente.delete(cliente.id).subscribe(
        clientes => {
          this.clientes = this.clientes.filter(nuevoArregloClient => nuevoArregloClient !== cliente)
        }
      );

      if (result.value) {
        Swal.fire(
          'Eliminado!',
          `Cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado.`,
          'success'
        )
      }
    })

  }

}
