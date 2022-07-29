import { Component, OnInit } from '@angular/core';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  public selecPersonaId!:string;
  public miPorfolio:any;

  constructor(private datosPorfolio:DataporfolioService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data:string)=>{
      this.selecPersonaId=data;
      this.datosPorfolio.obtenerDatos('/profile/busca/'+this.selecPersonaId).subscribe(data=>{
        this.miPorfolio=data.persona;
      });
    });
    console.log('personaId:', this.miPorfolio );
  }
}
