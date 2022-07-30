import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-laboral',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.scss']
})
export class LaboralComponent implements OnInit {
  private selecPersonaId!: string;
  public miLaboralList: any;
  public edicionOff:boolean=false;
  private addOff:boolean=true;

  constructor(private datosPorfolio: DataporfolioService, private router:Router, private autenticacion:AutenticacionService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data: string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/profile/busca/' + this.selecPersonaId).subscribe(data => {
        if (data != null) {
          this.miLaboralList = data.laborales;
        } else {
          this.miLaboralList = null;
        }
      });
    });
    this.autenticacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    console.log('personaId:', this.selecPersonaId);
  }

  grabarRegistro(frmLaboral:NgForm){
    if(this.addOff){
      this.modificarRegistro(frmLaboral);
    } else {
      this.agregarRegistro(frmLaboral);
    }
  }

  modificarRegistro(frmLaboral:NgForm){
    frmLaboral.value.profPersona={'id':frmLaboral.value.profPersona};
    console.log("Grabar:", frmLaboral.value);
    this.datosPorfolio.enviarDatos('/laboral/modificacion', frmLaboral.value).subscribe(data => {
      console.log(data);
    });
  }

  agregarRegistro(frmLaboral:NgForm){
    frmLaboral.value.profPersona={'id':+this.selecPersonaId};
    console.log("id", this.selecPersonaId);
    console.log("Alta:", frmLaboral.value);
    this.datosPorfolio.agregarDatos('/laboral/alta', frmLaboral.value).subscribe(data => {
      console.log("Agregado",data);
    });
    this.addOff=true;
    this.edicionOff=true;
    this.autenticacion.edicionOff$.next(this.edicionOff);
    this.ngOnInit();
    this.router.navigate(['/labotal'], {skipLocationChange:true});
  }

  nuevoRegistro(){
    this.addOff=false;
    this.miLaboralList=[
      {
        "id": 0,
        "profPersona": 0,
        "empresa": "",
        "ingreso": "",
        "egreso": "",
        "actividad": ""
    },
    ]
  }

  cancelarEdicion(){
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
