import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginas: any;
  arregloPaginas: number[];
  paginaActual: number;

  desde: number;
  hasta: number;

  constructor(private valorRuta: ActivatedRoute, private router: Router) { }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.cargarPaginador();
  }

  ngOnInit(): void {
    this.cargarPaginador()
  };

  cargarPaginador() {

    this.desde = Math.min(Math.max(1, this.paginas.number - 9), this.paginas.totalPages - 11);
    this.hasta = Math.max(Math.min(this.paginas.totalPages, this.paginas.number + 9), 20);

    if(this.paginas.totalPages > 20){
      this.arregloPaginas = new Array(this.hasta - this.desde + 1).fill(0)
      .map( (_valor, indice) => indice + this.desde)
    }else{
      this.arregloPaginas = new Array(this.paginas.totalPages).fill(0)
      .map( (_valor, indice) => indice + 1)
    }
  }
}


