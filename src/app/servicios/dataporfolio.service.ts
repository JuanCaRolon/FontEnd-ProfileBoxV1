import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataporfolioService {
  private url='https://apirestv2-production.up.railway.app';
  //private url='https://backend-profilebox-v1.herokuapp.com';
  //private url='http://localhost:8080';
  //'https://profileboxv0-rest2.herokuapp.com'
  //'https://pruebaacceso-v2.herokuapp.com'
  //'https://backend-profilebox-v1.herokuapp.com'
  
  private personaActualId$ = new BehaviorSubject<string>('0');
  //private datosProfile$=new BehaviorSubject<object>({});

  constructor(private http:HttpClient) { }

  obtenerDatos(datoRouting:string): Observable<any> {
    return this.http.get(this.url + datoRouting);
  }

  enviarDatos(datoRouting:string, datoJson:any): Observable<any> {
    return this.http.put(this.url + datoRouting, datoJson);
  }

  agregarDatos(datoRouting:string, datoJson:any): Observable<any> {
    return this.http.post(this.url + datoRouting, datoJson);
  }

  setPersonaSelec(personaSelId:string): void {
    this.personaActualId$.next(personaSelId);
    sessionStorage.setItem('personaId', JSON.stringify(personaSelId));
  }

  get getPersonaIdSelec$(): Observable<string> {
    //this.personaActualId$.next(sessionStorage.getItem('personaId')||'0');
    return this.personaActualId$.asObservable();  //Esta propiedad mantiene los valos del Objeto solicitado
  }

}
