import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../../services/clientes.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(private idRuta: ActivatedRoute, private servicioCliente: ClienteService) { }

  ngOnInit(): void {
    this.obtenerCliente();
  }

  obtenerCliente(): void {
    this.idRuta.params.subscribe(
      params => {
        const idRuta = params.id;
        this.servicioCliente.getCliente(idRuta).subscribe(
          cliente => {
            this.cliente = cliente;
          }
        );
      }
    );
  }

}


