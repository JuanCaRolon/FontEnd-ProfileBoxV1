import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataporfolioService {
  //private url='https://backend-profilebox-v1.herokuapp.com';
  //'https://profileboxv0-rest2.herokuapp.com'
  //'https://pruebaacceso-v2.herokuapp.com'
  //'https://backend-profilebox-v1.herokuapp.com'
  private url = 'http://localhost:8080';

  private personaActualId$ = new BehaviorSubject<string>('0');
  //private datosProfile$=new BehaviorSubject<object>({});

  constructor(private http:HttpClient) { }

  obtenerDatos(datoRouting:string): Observable<any> {

    return this.http.get(this.url + datoRouting);
  }

  enviarDatos(datoRouting:string, datoJson:any): Observable<any> {

    return this.http.put(this.url + datoRouting, datoJson);

  }

  setPersonaSelec(personaSelId:string): void {
    this.personaActualId$.next(personaSelId);
    sessionStorage.setItem('personaId', JSON.stringify(personaSelId));
  }

  get getPersonaIdSelec$(): Observable<string> {
    //this.personaActualId$.next(sessionStorage.getItem('personaId')||'0');
    return this.personaActualId$.asObservable();  //Esta propiedad mantiene los valos del Objeto solicitado
  }




  /*private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Se produjo un error del lado del cliente o de la red.
      console.error('Error:', error.error);
    } else {
      // El backend devolvió un código de respuesta fallido.
      // El cuerpo de la respuesta puede contener pistas sobre lo que salió mal.
      console.error(
        'Código devuelto de back-end ${error.status}, el cuerpo era:', error.error);
    }
    //Devolver un observable con un mensaje de error de cara al usuario.
    return throwError(() => new Error('Error; inténtelo de nuevo más tarde.'));
  }*/

}
