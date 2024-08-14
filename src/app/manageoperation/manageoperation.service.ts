import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Operation} from './manageoperation';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageOperationService {
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

    getAllOperation(): Observable<Operation[]>{
        return this.http.get<Operation[]>(`${this.baseUrl}`+`/operation/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveOperation(operation:Operation,newOperation:boolean): Observable<Operation>{
      operation.newOperation=newOperation
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<Operation>(`${this.baseUrl}`+`/operation/create`, operation)//, httpOptions)
    }

    deleteOperation(compteur: number): Observable<Operation> {
        return this.http.delete<Operation>(
          `${this.baseUrl}/operation/delete/${compteur}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}