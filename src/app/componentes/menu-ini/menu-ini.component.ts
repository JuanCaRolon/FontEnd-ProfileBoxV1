import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataporfolioService } from 'src/app/servicios/dataporfolio.service';

@Component({
  selector: 'app-menu-ini',
  templateUrl: './menu-ini.component.html',
  styleUrls: ['./menu-ini.component.scss']
})
export class MenuIniComponent implements OnInit {
  public estaLogeado:boolean=false;
  public miPersonaList:any;
  public selecPersonaId:string='0';
  public servicioPersona:string='';
  
  constructor(private datosPorfolio:DataporfolioService, private router:Router) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos('/persona/lista').subscribe(data=>{
      this.miPersonaList=data;
      console.log("Lista: ", this.miPersonaList);
    });
  }

  onEnviar(): void {
    if (this.selecPersonaId=="0"){
      this.estaLogeado=false;
      this.router.navigate(['/home']);
      //console.log("Menu....");  
    }else{
      console.log("Home....");
      //this.estaLogeado=true;
     // this.router.navigate(['/home']);
    }
    this.datosPorfolio.setPersonaSelec(this.selecPersonaId);
  }
 
  async onLogOut(){
    //const userLogeado=await this.autServ.logout();
    //this.router.navigate(['/sing-in'])
  }
}
