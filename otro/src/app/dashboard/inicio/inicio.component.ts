import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit  {
  userRole: number = 0; // Guarda el rol del usuario -> numero entero

  constructor(private router: Router) {}

  ngOnInit(): void {
    // simlamos que el rol sera de un docente normal 
    this.userRole = 4; 
  }

  goToClasses() {
    this.router.navigate(['/dashboard/proyectosA']); // Reemplaza '/mis-clases' con la ruta que deseas
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
