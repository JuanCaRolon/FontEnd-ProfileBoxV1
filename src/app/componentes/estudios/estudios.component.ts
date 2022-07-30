import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.scss']
})
export class EstudiosComponent implements OnInit {
  private selecPersonaId!: string;
  public miEstudioList: any;
  public edicionOff:boolean=false;
  private addOff:boolean=true;


  constructor(private datosPorfolio: DataporfolioService, private router:Router, private autenticacion:AutenticacionService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data:string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/profile/busca/' + this.selecPersonaId).subscribe(data => {
        if (data != null) {
          this.miEstudioList = data.estudios;
        } else {
          this.miEstudioList = null;
        }
      });
    });
    this.autenticacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    console.log('personaId:', this.selecPersonaId);
  }

  grabarRegistro(frmEstudio:NgForm){
    if(this.addOff){
      this.modificarRegistro(frmEstudio);
    } else {
      this.agregarRegistro(frmEstudio);
    }
  }

  modificarRegistro(frmEstudio:NgForm){
    frmEstudio.value.profPersona={'id':frmEstudio.value.profPersona};
    console.log("Modif:", frmEstudio.value);
    this.datosPorfolio.enviarDatos('/estudio/modificacion', frmEstudio.value).subscribe(data => {
      console.log(data);
    });
  }

  agregarRegistro(frmEstudio:NgForm){
    frmEstudio.value.profPersona={'id':+this.selecPersonaId};
    console.log("id", this.selecPersonaId);
    console.log("Alta:", frmEstudio.value);
    this.datosPorfolio.agregarDatos('/estudio/alta', frmEstudio.value).subscribe(data => {
      console.log("Agregado",data);
    });
    this.addOff=true;
    this.edicionOff=true;
    this.autenticacion.edicionOff$.next(this.edicionOff);
    this.ngOnInit();
    this.router.navigate(['/estudios'], {skipLocationChange:true});
  }

  nuevoRegistro(){
    this.addOff=false;
    this.miEstudioList=[
      {
        "id": 0,
        "profPersona": 0,
        "finalizado":true,
        "inicio": "",
        "fin": "",
        "nivel": "nivel",
        "carrera": "carrera",
        "institucion": "institucion"
    },
    ]
  }
    
  cancelarEdicion(){
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
