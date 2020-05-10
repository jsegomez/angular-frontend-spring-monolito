import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable, throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private router: Router) { }

  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // ======================= Métodos para Get =======================

  getClientes(pagina: number): Observable<any>{
    return this.http.get(`${this.urlEndPoint}/clientes/pagina/${pagina}`).pipe(
      catchError(e => {
        this.router.navigate(['/formulario']);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 3500
        });
        return throwError(e);
      })
    );
  }


  getCliente(id: number): Observable<Cliente>{
    return this.http.get(`${this.urlEndPoint}/cliente/${id}`).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {
        this.router.navigate(['/buscar']);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 3500
        });

        return throwError(e);
      })
    );
  }

  buscarPorNombres(nombres: string): Observable<any>{
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/clientes/nombres/${nombres}`).pipe(
      catchError( e => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `No hay resultados para ${nombres}`,
          text: `${e.error.mensaje}`,
          showConfirmButton: true,
          timer: 4000
        });

        return throwError(e);
      })
    );
  }

  buscarPorApellidos(apellidos: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/clientes/apellidos/${apellidos}`).pipe(
      catchError( e => {
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

  buscarPorEmail(email: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/clientes/email/${email}`).pipe(
      catchError( e => {
        if(e.status === 404){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `No hay resultados para ${email}`,
            text: `${e.error.mensaje}`,
            showConfirmButton: true,
            timer: 4000
          });
        }
        return throwError(e);
      })
    );
  }

  // ======================= Demás métodos CRUD =======================

  // Método para crear un cliente
  create(cliente: Cliente): Observable<any>{
    return this.http.post<Cliente>(`${this.urlEndPoint}/cliente`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.log(e.error.error)
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

  // Método para actualizar un cliente
  update(cliente: Cliente): Observable<any>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/cliente/${cliente.id}`,cliente,{headers: this.httpHeaders}).pipe(
      catchError( e => {
        if(e.status === 400){
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
  delete(id: number){
    return this.http.delete<Cliente>(`${this.urlEndPoint}/cliente/${id}`, {headers: this.httpHeaders})
  }

}
