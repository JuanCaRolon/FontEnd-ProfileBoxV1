import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
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
  //public servicioPersona:string='';
  
  constructor(private datosPorfolio:DataporfolioService, private autenticacion:AutenticacionService, private router:Router) { }

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
    this.autenticacion.edicionOff$.next(true);
    this.datosPorfolio.setPersonaSelec(this.selecPersonaId);
  }
 
  async onLogOut(){
    this.autenticacion.edicionOff$.next(true);
    this.router.navigate(['/menu']);
    this.selecPersonaId='0';
    this.datosPorfolio.setPersonaSelec(this.selecPersonaId);

    //const userLogeado=await this.autServ.logout();
    //this.router.navigate(['/sing-in'])
  }

  async onEdit(){
    //this.estaLogeado=!this.estaLogeado;
    //console.log("Login",this.estaLogeado);
    this.router.navigate(['/login']);
  }
}
