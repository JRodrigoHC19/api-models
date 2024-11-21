import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-proyecto',
  templateUrl: './detalles-proyecto.component.html',
  styleUrls: ['./detalles-proyecto.component.css']
})
export class DetallesProyectoComponent implements OnInit{

  proyectoId!: string; // Variable para almacenar el ID del proyecto
  proyectoData: any;   // Aquí se almacenará la información del proyecto

  // Simulación de datos (puedes sustituirlo con una llamada al backend)
  proyectos = [
    {
      id: '1',
      nombre: 'Proyecto de Software 1',
      descripcion: 'Accede a tus clases y actividades.',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      usuarioCreacion: 'Usuario A',
      avance: 50,
      entregables: 3,
      tareas: 4,
      etapas: [
        { nombre: 'Entregable 1', tareas: 4, activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',},
        { nombre: 'Entregable 2', tareas: 3, activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',}
      ]
    },
    {
      id: '2',
      nombre: 'Proyecto de Software 2',
      descripcion: 'Accede a tus clases y actividades.',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      usuarioCreacion: 'Usuario A',
      avance: 30,
      entregables: 4,
      tareas: 4,
      etapas: [
        { nombre: 'Entregable 1', tareas: 4, activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', },
        { nombre: 'Entregable 2', tareas: 3, activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', },
        { nombre: 'Entregable 3', tareas: 4, activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', },
        { nombre: 'Entregable 4', tareas: 3, activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', },
      ]
    },
    {
      id: '3',
      nombre: 'Proyecto de Software 3',
      descripcion: 'Accede a tus clases y actividades.',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      usuarioCreacion: 'Usuario A',
      avance: 70,
      entregables: 3,
      tareas: 4,
      etapas: [
        { nombre: 'Entregable 1', tareas: 4, activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', },
        { nombre: 'Entregable 2', tareas: 3, activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', }
      ]
    },
    {
      id: '4',
      nombre: 'Proyecto de Software 4',
      descripcion: 'Accede a tus clases y actividades.',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      usuarioCreacion: 'Usuario A',
      avance: 10,
      entregables: 3,
      tareas: 4,
      etapas: [
        { nombre: 'Entregable 1', tareas: 4, activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', },
        { nombre: 'Entregable 2', tareas: 3, activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', }
      ]
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Capturar el ID desde la URL
    this.proyectoId = this.route.snapshot.paramMap.get('id') || '';

    // Buscar el proyecto por ID
    this.proyectoData = this.proyectos.find(proy => proy.id === this.proyectoId);
  }

}
