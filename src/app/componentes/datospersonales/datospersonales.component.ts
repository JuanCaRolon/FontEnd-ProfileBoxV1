import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
//import { BehaviorSubject } from 'rxjs';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss']
})
export class DatospersonalesComponent implements OnInit {
  private selecPersonaId!:string;
  public miPersona:any;
  public edicionOff:boolean=false;
  //public miPersona= new BehaviorSubject<object>({});

  constructor(private datosPorfolio:DataporfolioService, private router:Router, private autenicacion:AutenticacionService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data:string)=>{
      this.selecPersonaId=data;
      this.datosPorfolio.obtenerDatos('/profile/busca/'+this.selecPersonaId).subscribe(data	=>{
        this.miPersona = data.persona;
      });
    });
    this.autenicacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    console.log('personaId:', this.selecPersonaId );
  }

  cancelarEdicion(){
    this.autenicacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
