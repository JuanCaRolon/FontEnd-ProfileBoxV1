import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.scss']
})
export class CapacitacionesComponent implements OnInit {
  private selecPersonaId!: string;
  public miCapacitacionList: any;
  public edicionOff: boolean = false;
  private addOff: boolean = true;

  constructor(private datosPorfolio: DataporfolioService, private router: Router, private autenticacion: AutenticacionService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data: string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/profile/busca/' + this.selecPersonaId).subscribe(data => {
        if (data != null) {
          this.miCapacitacionList = data.capacitaciones;
        } else {
          this.miCapacitacionList = null;
        }
      });
    });
    this.autenticacion.edicionOff$.subscribe(data => { this.edicionOff = data })

  }

  grabarRegistro(frmCapacitacion: NgForm) {
    if (this.addOff) {
      this.modificarRegistro(frmCapacitacion);
    } else {
      this.agregarRegistro(frmCapacitacion);
    }
  }

  modificarRegistro(frmCapacitacion: NgForm) {
    frmCapacitacion.value.profPersona = { 'id': frmCapacitacion.value.profPersona };
    console.log("Grabar:", frmCapacitacion.value);
    this.datosPorfolio.enviarDatos('/capacitacion/modificacion', frmCapacitacion.value).subscribe(data => {
      console.log(data);
    });
  }

  agregarRegistro(frmCapacitacion: NgForm) {
    frmCapacitacion.value.profPersona = { 'id': +this.selecPersonaId };
    console.log("id", this.selecPersonaId);
    console.log("Alta:", frmCapacitacion.value);
    this.datosPorfolio.agregarDatos('/capacitacion/alta', frmCapacitacion.value).subscribe(data => {
      console.log("Agregado", data);
    });
    this.addOff = true;
    this.edicionOff = true;
    this.autenticacion.edicionOff$.next(this.edicionOff);
    this.ngOnInit();
    this.router.navigate(['/capacitacion'], { skipLocationChange: true });
  }

  nuevoRegistro() {
    this.addOff = false;
    this.miCapacitacionList = [
      {
        "id": 0,
        "profPersona": 0,
        "inicio": "",
        "fin": "",
        "nivel": "",
        "carrera": "",
        "institucion": ""
      }
    ]
  }

  cancelarEdicion() {
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
