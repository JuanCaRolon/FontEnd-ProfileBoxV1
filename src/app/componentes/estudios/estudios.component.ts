import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
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


  constructor(private datosPorfolio: DataporfolioService, private router:Router, private autenicacion:AutenticacionService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data: string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/profile/busca/' + this.selecPersonaId).subscribe(data => {
        if (data != null) {
          this.miEstudioList = data.estudios;
        } else {
          this.miEstudioList = null;
        }
      });
    });
    this.autenicacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    console.log('personaId:', this.selecPersonaId);
  }

  grabarRegistro(frmEstudio:NgForm){
    frmEstudio.value.profPersona={'id':frmEstudio.value.profPersona};
    console.log("Grabar:", frmEstudio.value);
    this.datosPorfolio.enviarDatos('/estudio/modificacion', frmEstudio.value).subscribe(data => {
      console.log(data);
    });
    //this.router.navigate(['/datospersonales']);
  }

  agregarRegistro(){
    this.miEstudioList=[
      {
        "id": 1,
        "profPersona": 1,
        "finalizado": true,
        "inicio": "",
        "fin": "",
        "nivel": "XXXXXXXXXXXX",
        "carrera": "YYYYYYYYYYY",
        "institucion": "WWWWWWWWWWWWWWWWW"
    },
    ]
  }
  
  cancelarEdicion(){
    this.autenicacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
