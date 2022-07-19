import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AppComponent } from './app.component';
import { CapacitacionesComponent } from './componentes/capacitaciones/capacitaciones.component';
import { DatospersonalesComponent } from './componentes/datospersonales/datospersonales.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { EstudiosComponent } from './componentes/estudios/estudios.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { LaboralComponent } from './componentes/laboral/laboral.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { TodoComponent } from './componentes/todo/todo.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuIniComponent } from './componentes/menu-ini/menu-ini.component';

const routes: Routes = [
  //{path: 'app-component', component:AppComponent},
   
  {path:'capacitaciones', component:CapacitacionesComponent},
  {path:'datospersonales', component:DatospersonalesComponent},
  {path:'encabezado', component:EncabezadoComponent},
  {path:'estudios', component:EstudiosComponent},
  {path:'habilidades', component:HabilidadesComponent},
  {path:'laborales', component:LaboralComponent},
  {path:'resumen', component:ResumenComponent},
  {path:'todo', component:TodoComponent},
  {path: 'menu-ini', component:MenuIniComponent},
  {path: 'home', component:HomeComponent}
  //{path:'', redirectTo: 'datospersonales', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
