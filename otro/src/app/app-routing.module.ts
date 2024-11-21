import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes standalone
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ProyectosComponent } from './dashboard/proyectos/proyectos.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { ConfiguracionComponent } from './dashboard/configuracion/configuracion.component';
import { LogoutComponent } from './dashboard/logout/logout.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { DetallesProyectoComponent } from './detalles-proyecto/detalles-proyecto.component';
import { ProyectoEntregablesComponent } from './proyecto-entregables/proyecto-entregables.component';
import { ProyectosComponent as AlumnoProyectos } from './proyectos/proyectos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [ 
      { path: '', component: InicioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'proyectos', component: ProyectosComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'logout', component: LogoutComponent }, 
      { path: 'proyectosA', component: AlumnoProyectos },
      { path: 'detalles/:id', component: DetallesProyectoComponent },
      { path: 'entregables/:id', component: ProyectoEntregablesComponent },
    ]
  },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
