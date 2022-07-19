import { Component, OnInit } from '@angular/core';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss']
})
export class DatospersonalesComponent implements OnInit {
  private selecPersonaId!:string;
  public miPersona:any;

  constructor(private datosPorfolio:DataporfolioService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data:string)=>{
      this.selecPersonaId=data;
      this.datosPorfolio.obtenerDatos('/persona/busca/'+this.selecPersonaId).subscribe(data=>{
        this.miPersona=data;
      });
    });
    console.log('personaId:', this.selecPersonaId );
  }

}
