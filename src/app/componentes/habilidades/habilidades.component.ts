import { Component, OnInit } from '@angular/core';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {
  private selecPersonaId!:string;
  public miHabilidadList:any;


  constructor(private datosPorfolio:DataporfolioService) { }

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
    console.log('personaId:', this.selecPersonaId );
  }

}
