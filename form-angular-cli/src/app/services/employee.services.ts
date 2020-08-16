import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class EmployeeService {
  public uri = 'http://localhost:3977';
  constructor(private _http: HttpClient) {
  }

  async getEmployees() {
      let headers = new Headers({'Content-Type':'application/json'});
      return this._http.get(`/api/obtener-empleados/`).toPromise();
  }
createEmployee(respuesta) {
    let headers = new Headers({'Content-Type':'application/json'});
      return this._http.post<any>(`/api/crear-empleado/`, respuesta);
  }
}
