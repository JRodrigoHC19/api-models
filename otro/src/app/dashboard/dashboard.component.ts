import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: number = 0; // Guarda el rol del usuario -> numero entero
  pageTitle: string = 'Dashboard';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // simlamos que el rol sera de un docente normal 
    this.userRole = 4; 

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.updatePageTitle(currentRoute);
    });
  }

  updatePageTitle(route: string): void {
    if (route.includes('proyectos')) {
      this.pageTitle = 'Proyectos';
    } else if (route.includes('usuarios')) {
      this.pageTitle = 'Usuarios';
    } else if (route.includes('perfil')) {
      this.pageTitle = 'Perfil';
    } else if (route.includes('configuracion')) {
      this.pageTitle = 'Configuración';
    } else if (route.includes('detalles')) {
      this.pageTitle = 'Detalles del proyecto';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }

  getRoleDescription(role: number): string {
    switch (role) {
      case 1: return 'Docente Jefe';
      case 2: return 'Docente';
      case 3: return 'Alumno Líder';
      case 4: return 'Alumno';
      default: return 'Usuario';
    }
  }
}
