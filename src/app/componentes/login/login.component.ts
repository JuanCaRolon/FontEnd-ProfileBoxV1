import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private autenticacion:AutenticacionService, private locacion:Location) {
    this.formLogin=this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      deviceId:['1234567890'],
      deviceType:['DEVICE_TYPE_ANDROID']
    })
   }

  ngOnInit(): void {
  }

  get Email(){
    return this.formLogin.get('email');
  }

  get Password(){
    return this.formLogin.get('password');
  }

  onEnviar(event:Event){
    event.preventDefault;
    // llamada al servicio (this.formLogin.value)
    /*this.autenicacion.IniciarSesion(this.formLogin.value).subscribe(data=>{
      console.log("data:", JSON.stringify(data));
      this.router.navigate(['/datospersonales']);
    });*/
    this.autenticacion.edicionOff$.next(false);
    //this.router.navigate(['/datospersonales']);
    this.locacion.back();
  }

  onClose(){
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/datospersonales']);
  }
}
