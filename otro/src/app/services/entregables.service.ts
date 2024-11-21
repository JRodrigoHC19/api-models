import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregablesService {
  private baseUrl = 'http://localhost:4000/api/entregables'; // URL de tu API backend

  constructor(private http: HttpClient) {}

  // Obtener todos los entregables
  getEntregables(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Crear un entregable
  createEntregable(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Obtener entregable por ID
  getEntregableById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
