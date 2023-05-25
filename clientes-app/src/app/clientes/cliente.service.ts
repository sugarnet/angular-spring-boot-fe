import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { Region } from './region';
import { AuthService } from '../users/auth.service';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = URL_BACKEND + '/api/v1/clientes';

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    // return of(CLIENTES);
    // return this.http.get<Cliente[]>(this.url);
    return this.http.get(this.url + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: Tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {

        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();

          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyy', 'en-US');
          let datePipe = new DatePipe('es');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'dd-MMM-yyyy');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: Tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    console.log(cliente);
    return this.http.post(this.url, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        if (e.error.message) {
          console.error(e.error.message);
        }

        return throwError(() => e);
      }));
  }

  get(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(catchError(e => {


      if (e.status != 401 && e.error.message) {
        this.router.navigate(['/clientes']);
        console.error(e.error.message);
      }

      return throwError(() => e);
    }));
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.url}/${cliente.id}`, cliente).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        if (e.error.message) {
          console.error(e.error.message);
        }
        return throwError(() => e);
      }));
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {

        if (e.error.message) {
          console.error(e.error.message);
        }
        return throwError(() => e);
      }));
  }

  upload(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.url}/regiones`);
  }
}
