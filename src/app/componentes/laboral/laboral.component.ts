import { Component, OnInit } from '@angular/core';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-laboral',
  templateUrl: './laboral.component.html',
  styleUrls: ['./laboral.component.scss']
})
export class LaboralComponent implements OnInit {
  private selecPersonaId!: string;
  public miLaboralList: any;

  constructor(private datosPorfolio: DataporfolioService) { }

  async ngOnInit(): Promise<void> {
    this.datosPorfolio.getPersonaIdSelec$.subscribe((data: string) => {
      this.selecPersonaId = data;
      this.datosPorfolio.obtenerDatos('/profile/busca/' + this.selecPersonaId).subscribe(data => {
        if (data != null) {
          this.miLaboralList = data.laborales;
        } else {
          this.miLaboralList = null;
        }
      });
    });
    console.log('personaId:', this.selecPersonaId);
  }


}
