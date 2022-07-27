import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private userDefault = JSON.stringify({
    email: 'user@email.com',
    password: '1234567890',
    deviceId: '1234567890',
    deviceType: 'DEVICE_TYPE_ANDROID'
  });

  url = "";
  usuarioActual$: BehaviorSubject<any>;
  edicionOff$:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.usuarioActual$ = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('usuarioActual') || this.userDefault));
  }

  IniciarSesion(credenciales:any):Observable<any> {

    /*return this.http.post(this.url, credenciales).pipe(
      map(data => {
        sessionStorage.setItem('usuarioActual', JSON.stringify(data));
        this.usuarioActual$.next(data);
        this.edicionOff$.next(false);
        return data;
      })
    )*/
    this.usuarioActual$.next(JSON.parse(this.userDefault));
    this.edicionOff$.next(false);
    return JSON.parse(this.userDefault);
  }

  CerrarSesion(){
    this.edicionOff$.next(true);
  }
  
}
