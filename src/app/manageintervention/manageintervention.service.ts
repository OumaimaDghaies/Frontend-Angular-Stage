import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Intervention} from './manageintervention';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageInterventionService {
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

    getAllIntervention(): Observable<Intervention[]>{
        return this.http.get<Intervention[]>(`${this.baseUrl}`+`/intervention/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveIntervention(intervention:Intervention): Observable<Intervention>{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log("jkhjk"+JSON.stringify(intervention))
      return this.http.post<Intervention>(`${this.baseUrl}`+`/intervention/create`, intervention, { headers })//, httpOptions)
  }

    deleteIntervention(id: number): Observable<Intervention> {
        return this.http.delete<Intervention>(
          `${this.baseUrl}/intervention/delete/${id}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}