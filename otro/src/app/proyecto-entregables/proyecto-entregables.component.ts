import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntregablesService } from '../services/entregables.service';

@Component({
  selector: 'app-proyecto-entregables',
  templateUrl: './proyecto-entregables.component.html',
  styleUrls: ['./proyecto-entregables.component.css']
})
export class ProyectoEntregablesComponent implements OnInit{
  proyectoId!: string; // Variable para almacenar el ID del proyecto
  proyectoData: any;   // Aquí se almacenará la información del proyecto
  selectedEntregable: any = null; // Variable para almacenar el entregable seleccionado
  showCreateUserModal = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  archivo: string = ''; 

  proyectos = [
    {
      id: '1',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      entregables: [
        { nombre: 'Entregable 1', activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', 
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
          ]},
        { nombre: 'Entregable 2', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
          ]},
        { nombre: 'Entregable 3', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
            { nombre: 'tarea 4', descripcion: 'descripcion tarea 4'},
          ]},
        { nombre: 'Entregable 4', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
          ]},
      ]
    },
    {
      id: '2',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      entregables: [
        { nombre: 'Entregable 1', activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', 
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 1'},
          ]},
        { nombre: 'Entregable 2', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
          ]},
      ]
    },
    {
      id: '3',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      entregables: [
        { nombre: 'Entregable 1', activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', 
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
          ]},
        { nombre: 'Entregable 2', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
          ]},
      ]
    },
    {
      id: '4',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-06-01',
      estado: 'En progreso',
      entregables: [
        { nombre: 'Entregable 1', activo: true, fechaInicio: '2024-01-01', fechaFin: '2024-06-01', 
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
            { nombre: 'tarea 4', descripcion: 'descripcion tarea 4'},
          ]},
        { nombre: 'Entregable 2', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
          ]},
        { nombre: 'Entregable 3', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
          ]},
        { nombre: 'Entregable 4', activo: false, fechaInicio: '2024-01-01', fechaFin: '2024-06-01',
          tareas:[
            { nombre: 'tarea 1', descripcion: 'descripcion tarea 1'},
            { nombre: 'tarea 2', descripcion: 'descripcion tarea 2'},
            { nombre: 'tarea 3', descripcion: 'descripcion tarea 3'},
          ]},
      ]
    },
  ];

  constructor(private route: ActivatedRoute, private entregablesService: EntregablesService) {}

  ngOnInit(): void {
    // Capturar el ID desde la URL
    this.proyectoId = this.route.snapshot.paramMap.get('id') || '';
    // Buscar el proyecto por ID
    this.proyectoData = this.proyectos.find(proy => proy.id === this.proyectoId);
  }

  onSelectEntregable(entregable: any): void {
    this.selectedEntregable = entregable; // Actualiza el entregable seleccionado
  }

  openCreateUserModal(): void {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal(): void {
    this.showCreateUserModal = false;
    this.removeSelectedFile(); // Limpia el archivo seleccionado
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name; // Mostrar el nombre del archivo
    }
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    this.selectedFileName = null; // Restablece el nombre del archivo

    // Reinicia el input de archivo para permitir seleccionar el mismo archivo nuevamente
    const fileInputElement = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInputElement) {
      fileInputElement.value = '';
    }
  }

  uploadFile(): void {
    if (this.selectedFile && this.selectedEntregable) {
      const formData = new FormData();
      formData.append('archivo', this.selectedFile);
      formData.append('estudianteId', '123'); // Reemplaza con valores reales
      formData.append('correoEstudiante', 'test@test.com');
      formData.append('proyectoId', this.proyectoId);
      formData.append('nombreEntregable', this.selectedEntregable.nombre);

      this.entregablesService.createEntregable(formData).subscribe(
        (response) => {
          console.log('Entregable creado:', response);
          this.closeCreateUserModal(); // Cierra el modal después de guardar
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
        }
      );
    }
  }

}
