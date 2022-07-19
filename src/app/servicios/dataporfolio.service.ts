import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataporfolioService {
  private personaActualId$=new BehaviorSubject<string>('0');
  private datosProfile$=new BehaviorSubject<object>({});
  
  constructor(private http:HttpClient) {}

  obtenerDatos(datoRouting:String):Observable<any>{
    //return this.http.get('http://localhost:8080'+datoRouting); 
    //https://profileboxv0-rest2.herokuapp.com/ https://pruebaacceso-v2.herokuapp.com/
    
    return this.http.get('https://profileboxv0-rest2.herokuapp.com'+datoRouting); 
  }

  setPersonaSelec(personaSelId:string):void{
    this.personaActualId$.next(personaSelId);
    sessionStorage.setItem('personaId', JSON.stringify(personaSelId));
  }

  get getPersonaIdSelec$():Observable<string>{
    //this.personaActualId$.next(sessionStorage.getItem('personaId')||'0');
    
    return this.personaActualId$.asObservable();  //Esta propiedad mantiene los valos del Objeto solicitado
  }
  
}
