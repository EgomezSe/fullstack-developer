import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class EmployeeService {
  constructor(private _http: HttpClient) {
  }

  async getEmployees() {
      
      return this._http.get(`/api/obtener-empleados/`).toPromise();
  }
 public createEmployee(respuesta) {
    
      return this._http.post<any>(`/api/crear-empleado`, respuesta);
  }
}
