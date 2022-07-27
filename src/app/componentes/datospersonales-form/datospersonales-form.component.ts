import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-datospersonales-form',
  templateUrl: './datospersonales-form.component.html',
  styleUrls: ['./datospersonales-form.component.scss']
})

export class DatospersonalesFormComponent implements OnInit {
  formPersona: FormGroup;
  private selecPersonaId!: string;
  public miPersona: any;
  public edicionOff:boolean=false;

  constructor(private fb:FormBuilder, private datosPorfolio:DataporfolioService, private router:Router, private autenticacion:AutenticacionService) {
    this.formPersona = this.fb.group({
      apellido: ['', Validators.required],
      nombres: ['', Validators.required],
      telefonoTipo: [''],
      telefonoNumero: [''],
      domicilioCalle: [''],
      domicilioNumero: [''],
      domicilioCiudad: [''],
      domicilioPais: [''],
      email: ['', Validators.required]
    });

  }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data: string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/persona/busca/' + this.selecPersonaId).subscribe(data => {
        this.miPersona = data;
        //this.formPersona.setValue({
        this.formPersona.patchValue({
          apellido: this.miPersona.apellido,
          nombres: this.miPersona.nombres,
          telefonoTipo: this.miPersona.telefono.tipo,
          telefonoNumero: this.miPersona.telefono.numero,
          domicilioCalle: this.miPersona.domicilio.calle,
          domicilioNumero: this.miPersona.domicilio.numero,
          domicilioCiudad: this.miPersona.domicilio.ciudad,
          domicilioPais: this.miPersona.domicilio.pais,
          email: this.miPersona.email
        });
      });
    });
    this.autenticacion.edicionOff$.subscribe(data=>{this.edicionOff=data})
    /// console.log('personaId:', this.miPersona);
  }

  grabarRegistro() {
      this.miPersona.apellido = this.formPersona.value.apellido;
      this.miPersona.nombres = this.formPersona.value.nombres;
      this.miPersona.telefono.tipo = this.formPersona.value.telefonoTipo;
      this.miPersona.telefono.numero = this.formPersona.value.telefonoNumero;
      this.miPersona.domicilio.calle = this.formPersona.value.domicilioCalle;
      this.miPersona.domicilio.numero = this.formPersona.value.domicilioNumero;
      this.miPersona.domicilio.ciudad = this.formPersona.value.domicilioCiudad;
      this.miPersona.domicilio.pais = this.formPersona.value.domicilioPais;
      this.miPersona.email = this.formPersona.value.email;
      this.datosPorfolio.enviarDatos('/persona/modificacion', this.miPersona).subscribe(data => {
        //this.miPersona = data;
        console.log(data);
      });
      this.router.navigate(['/datospersonales']);
  }

  cancelarEdicion(){
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
