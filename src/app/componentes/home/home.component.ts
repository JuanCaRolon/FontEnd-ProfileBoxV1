import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public selecPersona!:string

  constructor(private datosPorfolio:DataporfolioService, private router:Router ) {}

  async ngOnInit():Promise<void>{
    await this.leerDatos();
    //this.router.navigate(['/datospersonales']);
  }

  async leerDatos():Promise<void>{
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data:string)=>{
      this.selecPersona=data;
      });
    console.log('personaId:', this.selecPersona );
  }}
