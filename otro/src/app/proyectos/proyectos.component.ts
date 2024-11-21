import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {

  proyectos = [
    {
      nombre: 'Proyecto de Software 1',
      descripcion: 'Accede a tus clases y actividades.',
      enlace: 'https://youtu.be/D9G1VOjN_84?si=_KPbrwXpUV8u64c-',
      detalles: '/dashboard/detalles/1',
      entregables: '/dashboard/entregables/1',
    },
    {
      nombre: 'Proyecto de Software 2',
      descripcion: 'Revisa tu progreso y desempeño.',
      enlace: 'https://youtu.be/OkscEokV238?si=N2ZQXi31FrNn6605',
      detalles: '/dashboard/detalles/2',
      entregables: '/dashboard/entregables/2',
    },
    {
      nombre: 'Proyecto de Software 3',
      descripcion: 'Accede a tus clases y actividades.',
      enlace: 'https://youtu.be/D9G1VOjN_84?si=_KPbrwXpUV8u64c-',
      detalles: '/dashboard/detalles/3',
      entregables: '/dashboard/entregables/3',
    },
    {
      nombre: 'Proyecto de Software 4',
      descripcion: 'Revisa tu progreso y desempeño.',
      enlace: 'https://youtu.be/OkscEokV238?si=N2ZQXi31FrNn6605',
      detalles: '/dashboard/detalles/4',
      entregables: '/dashboard/entregables/4',
    }
  ];

  constructor(private router: Router) {
    console.log(this.proyectos); 
  }

  goToLink(url: string): void {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  }

  goToDetails(detalles: string) {
    this.router.navigate([detalles]); // Navega a la ruta proporcionada
  }

  goToEntregables(entregables: string) {
    this.router.navigate([entregables]);
  }
  

}
