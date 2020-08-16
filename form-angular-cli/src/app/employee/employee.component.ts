import { Component, OnInit } from '@angular/core';
import { Validator, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {EmployeeService} from '../services/employee.services';
import {MatInputModule} from '@angular/material';
import { from } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

totalesEmployees: any = [];
nombreEmpleado: string;
mensaje: string;
nombreJefe: string;
  constructor(private employeeServices: EmployeeService) { }

  ngOnInit() {
    this.obtenerEmployees();
  }

  fetchTotalesEmployees(self: any, data: any){
    this.totalesEmployees = data;
  }

  obtenerEmployees(){
    const self = this;
    this.employeeServices.getEmployees().then((data:any)=>{
      self.fetchTotalesEmployees(self, data);
    });
  }
  valorEmpleado(event: any){
    this.nombreEmpleado = event.target.value;
  }
  valorJefe(event: any){
    this.nombreJefe = event.target.value;
  }
  createEmployee(){
    if(this.nombreEmpleado == null){
      this.mensaje = 'Es necesario diligenciar el campo nombre Empleado.';
    }
    else{
      var objetoEmployee ={
      obj:{
          fullName: this.nombreEmpleado,
          functions: 'employee',
          boss: this.nombreJefe
      }
    };
    this.employeeServices.createEmployee(objetoEmployee).subscribe((res) => {
          this.mensaje = res.message;
    },(e)=>{
      this.mensaje = e.message;

    });

    }
  }
}
