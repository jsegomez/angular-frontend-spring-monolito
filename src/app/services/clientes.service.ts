import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private router: Router) { }

  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private isNoAutorizado(e): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  // ======================= Métodos para Get =======================

  // Método para mostrar todos los clientes paginados
  getClientes(pagina: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/clientes/pagina/${pagina}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/formulario']);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 2500
        });
        return throwError(e);
      })
    );
  }

  // Ver detalle de un cliente
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/clientes/${id}`).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/clientes/buscar']);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 2000
        });

        return throwError(e);
      })
    );
  }

  // Método para búsqueda por nombre
  buscarPorNombres(nombres: string): Observable<any> {
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/clientes/nombres/${nombres}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `No hay resultados para ${nombres}`,
          text: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 2500
        });

        return throwError(e);
      })
    );
  }

  // Método para búsqueda por apellido
  buscarPorApellidos(apellidos: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/clientes/apellidos/${apellidos}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `No hay resultados para ${apellidos}`,
          text: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 4000
        });

        return throwError(e);
      })
    );
  }

  // Método para búsqueda por correo electrónico
  buscarPorEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/clientes/email/${email}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `No hay resultados para ${email}`,
          text: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 4000
        })
        return throwError(e);
      })
    );
  }

  // Método para obtener regiones
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlEndPoint}/clientes/regiones`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  // ======================= Demás métodos CRUD =======================

  // Método para crear un cliente
  create(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(`${this.urlEndPoint}/clientes`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }        
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `text: ${e.error.error}`,
          showConfirmButton: true,
          timer: 2500
        });

        return throwError(e);
      })
    );
  }

  // Método para actualizar un cliente
  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/clientes/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          text: `text: ${e.error.error}`,
          showConfirmButton: true,
          timer: 4000
        });

        return throwError(e);
      })
    );
  }

  // Método para eliminar un cliente
  delete(id: number) {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/clientes/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  // Método para cargar una imagen
  subirFoto(archivo: File, id: any): Observable<HttpEvent<{}>> {
    // tslint:disable-next-line: prefer-const
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/clientes/upload`, formData, {
      reportProgress: true
    });

    try {
      return this.http.request(req).pipe(
        catchError(e=> {
          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
        })
      );
    } catch (error) {
      return error;
    }
  }
}


