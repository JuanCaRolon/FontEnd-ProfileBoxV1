import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapacitacionesComponent } from './componentes/capacitaciones/capacitaciones.component';
import { DatospersonalesComponent } from './componentes/datospersonales/datospersonales.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { EstudiosComponent } from './componentes/estudios/estudios.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { HomeComponent } from './componentes/home/home.component';
import { LaboralComponent } from './componentes/laboral/laboral.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { MenuIniComponent } from './componentes/menu-ini/menu-ini.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { TodoComponent } from './componentes/todo/todo.component';


@NgModule({
  declarations: [
    AppComponent,
    CapacitacionesComponent,
    DatospersonalesComponent,
    EncabezadoComponent,
    EstudiosComponent,
    HabilidadesComponent,
    HomeComponent,
    LaboralComponent,
    ResumenComponent,
    MenuIniComponent,
    BannerComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
