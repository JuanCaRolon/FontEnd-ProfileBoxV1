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
  private addOff: boolean = true;


  constructor(private datosPorfolio:DataporfolioService, private router:Router, private autenticacion:AutenticacionService) { }

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
    this.autenticacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    console.log('personaId:', this.selecPersonaId );
  }

  grabarRegistro(frmHabilidad: NgForm) {
    if (this.addOff) {
      this.modificarRegistro(frmHabilidad);
    } else {
      this.agregarRegistro(frmHabilidad);
    }
  }


  modificarRegistro(frmHabilidad:NgForm){
    frmHabilidad.value.profPersona={'id':frmHabilidad.value.profPersona};
    console.log("Grabar:", frmHabilidad.value);
    this.datosPorfolio.enviarDatos('/habilidad/modificacion', frmHabilidad.value).subscribe(data => {
      console.log(data);
    });
  }

  agregarRegistro(frmHabilidad: NgForm) {
    frmHabilidad.value.profPersona = { 'id': +this.selecPersonaId };
    console.log("id", this.selecPersonaId);
    console.log("Alta:", frmHabilidad.value);
    this.datosPorfolio.agregarDatos('/habilidad/alta', frmHabilidad.value).subscribe(data => {
      console.log("Agregado", data);
    });
    this.addOff = true;
    this.edicionOff = true;
    this.autenticacion.edicionOff$.next(this.edicionOff);
    this.ngOnInit();
    this.router.navigate(['/habilidad'], { skipLocationChange: true });
  }

  nuevoRegistro() {
    this.addOff = false;
    this.miHabilidadList = [
      {
        "id": 0,
        "profPersona": 0,
        "tipo": "",
        "descripcion": ""
      }
    ]
  }

  cancelarEdicion(){
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
