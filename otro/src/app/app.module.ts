import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Módulo de rutas
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ProyectosComponent } from './dashboard/proyectos/proyectos.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { LogoutComponent } from './dashboard/logout/logout.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { SubirArchivoComponent } from './subir-archivo/subir-archivo.component';
import { DetallesTareaComponent } from './detalles-tarea/detalles-tarea.component';
import { DetallesProyectoComponent } from './detalles-proyecto/detalles-proyecto.component';
import { ProyectosComponent as AlumnoProyectos } from './proyectos/proyectos.component';
import { ProyectoEntregablesComponent } from './proyecto-entregables/proyecto-entregables.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsuariosComponent,
    ProyectosComponent,
    PerfilComponent,
    ConfiguracionComponent,
    LogoutComponent,
    InicioComponent,
    SubirArchivoComponent,
    DetallesTareaComponent,
    DetallesProyectoComponent,
    AlumnoProyectos,
    ProyectoEntregablesComponent
    //CrearGruposComponent  // Solo AppComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Módulo de rutas
    // No necesitas importar LoginComponent o LoginDocenteComponent aquí
    RouterModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
