import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../../services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css'],
})
export class DetalleClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  imagen: File;
  textoInput = 'Seleccionar...';
  progresoCarga: number;
  cargandoArchivo = false;

  constructor(
    private idRuta: ActivatedRoute,
    private servicioCliente: ClienteService,
  ) { }

  ngOnInit(): void {
    this.obtenerCliente();
  }

  obtenerCliente(): void {
    this.idRuta.params.subscribe((params) => {
      const idRuta = params.id;
      this.servicioCliente.getCliente(idRuta).subscribe((respuesta) => {
        this.cliente = respuesta;
      });
    });
  }

  // Función para cargar imagen a variable
  cargarFoto(event: any) {
    this.imagen = event.target.files[0];
    this.textoInput = this.imagen.name;
    if (this.imagen.type.indexOf('image') < 0) {
      Swal.fire('Error: ', 'Archivo no es una imagen', 'error');
    }
  }

  subirFoto() {
    if (!this.imagen) {
      Swal.fire('Error: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.servicioCliente
        .subirFoto(this.imagen, this.cliente.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.cargandoArchivo = true;
            this.progresoCarga = Math.round((event.loaded / event.total) * 100);
            console.log(this.progresoCarga);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.cliente = response.cliente as Cliente;
            this.cargandoArchivo = false;
          }
        });
      this.textoInput = 'Seleccionar...';
    }
  }
}
