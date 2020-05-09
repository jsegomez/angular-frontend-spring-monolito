import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes = () => {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente){
    Swal.fire({
      title: '¿Seguro desea eliminar cliente?',
      text: 'Una vez eliminano no se puede recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          respuesta => {
            this.clientes = this.clientes.filter(nuevoArregloCliente => nuevoArregloCliente !== cliente)
          }
        );
        Swal.fire(
          'Eliminado!',
          `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito`,
          'success'
        )
      }
    })

  }

}
