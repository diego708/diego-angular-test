import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8100/";

var httpLink = {
  getAllEmployee: apiUrl + "/api/employee/getAllEmployee",
  deleteEmployeeById: apiUrl + "/api/employee/deleteEmployeeById",
  getEmployeeDetailById: apiUrl + "/api/employee/getEmployeeDetailById",
  saveEmployee: apiUrl + "/api/employee/saveEmployee",
  getAllTask: apiUrl + "/api/task/getAllTask",
  deleteTaskById: apiUrl + "/api/task/deleteTaskById",
  getTaskDetailById: apiUrl + "/api/task/getTaskDetailById",
  saveTask: apiUrl + "/api/task/saveTask"
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployee);
  }
  public deleteEmployeeById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteEmployeeById + '?employeeId=' + model, "");
  }
  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeDetailById + '?employeeId=' + model);
  }
  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }  
  public getAllTask(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTask);
  }
  public deleteTaskById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTaskById + '?taskId=' + model, "");
  }
  public getTaskDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getTaskDetailById + '?taskId=' + model);
  }
  public saveTask(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveTask, model);
  }
}
