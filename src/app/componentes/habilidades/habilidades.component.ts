import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {
  private selecPersonaId!:string;
  public miHabilidadList:any;
  public edicionOff:boolean=false;


  constructor(private datosPorfolio:DataporfolioService, private router:Router, private autenicacion:AutenticacionService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data:string)=>{
      this.selecPersonaId=data;
      this.datosPorfolio.obtenerDatos('/profile/busca/'+this.selecPersonaId).subscribe(data=>{
        if (data != null) {
        this.miHabilidadList=data.habilidades;
        } else {
          this.miHabilidadList=null;
        }
      });
    });
    this.autenicacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    console.log('personaId:', this.selecPersonaId );
  }

  grabarRegistro(frmHabilidad:NgForm){

    frmHabilidad.value.profPersona={'id':frmHabilidad.value.profPersona};

    console.log("Grabar:", frmHabilidad.value);
    
    this.datosPorfolio.enviarDatos('/habilidad/modificacion', frmHabilidad.value).subscribe(data => {
      console.log(data);
    });

    //this.router.navigate(['/datospersonales']);
    
  }

  cancelarEdicion(){
    this.autenicacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
