import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { ClienteService } from '../../../../services/clientes.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  pagina: number;

  constructor(
    private valorRuta: ActivatedRoute,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes = () => {
    this.valorRuta.params.subscribe(
      params => {
        if(params.id == null){
          this.pagina = 0;
        }

        this.pagina = params.id;

        this.clienteService.getClientes(this.pagina).subscribe(
          respuesta => this.clientes = respuesta.content
        )
      }
    )
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
        Swal.fire({
          title: 'Cliente eliminado con éxito',
          text: `${cliente.nombre} ${cliente.apellido}`,
          icon: 'success',
          timer: 1500
        })
      }
    })

  }

}
