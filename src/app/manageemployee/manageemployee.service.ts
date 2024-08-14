import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Employee} from './manageemployee';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageEmployeeService {
    //private baseUrl = environment.apiUrl;
    //private baseUrl = "http://localhost:8085/springbootrestapi/api";
    private baseUrl = environment.apiUrl;
    private baseGPSUrl = environment.apiGPSUrl;
    private GPSStartTime = environment.GPSStartTime;
    private GPSEndTime = environment.GPSEndtime;

    currentuser:User=new User();

    constructor(private http: HttpClient,private tokenService:TokenStorageService) {
        this.currentuser=this.tokenService.getUser();
     }

    getAllEmployee(): Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.baseUrl}`+`/employee/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveEmployee(Employee:Employee,newEmployee:boolean): Observable<Employee>{
        Employee.newEmployee=newEmployee
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<Employee>(`${this.baseUrl}`+`/employee/create`, Employee)//, httpOptions)
    }

    deleteEmployee(compteur: number): Observable<Employee> {
        return this.http.delete<Employee>(
          `${this.baseUrl}/employee/delete/${compteur}`
        );
      }

    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}