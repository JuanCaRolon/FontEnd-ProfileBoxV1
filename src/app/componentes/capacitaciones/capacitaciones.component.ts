import { Component, OnInit } from '@angular/core';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.scss']
})
export class CapacitacionesComponent implements OnInit {
  private selecPersonaId!: string;
  public miCapacitacionList: any;

  constructor(private datosPorfolio: DataporfolioService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data: string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/profile/busca/'+this.selecPersonaId).subscribe(data => {
        //console.log('capacitacion:', data === null);
        if (data != null) {
          this.miCapacitacionList = data.capacitaciones;
        } else {
          this.miCapacitacionList = null;
        }
      });
    });
    //console.log('capacitacion:', (this.miCapacitacionList===[]) ); //this.selecPersonaId); // 
  }

}
