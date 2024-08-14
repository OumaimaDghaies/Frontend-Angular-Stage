import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { TypeOperation} from './managetypeoperation';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageTypeOperationService {
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

    getAllTypeOperation(): Observable<TypeOperation[]>{
        return this.http.get<TypeOperation[]>(`${this.baseUrl}`+`/typeoperation/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveTypeOperation(typeoperation:TypeOperation,newTypeOperation:boolean): Observable<TypeOperation>{
      typeoperation.newTypeOperation=newTypeOperation
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<TypeOperation>(`${this.baseUrl}`+`/typeoperation/create`, typeoperation)//, httpOptions)
    }

    deleteTypeOperation(compteur: number): Observable<TypeOperation> {
        return this.http.delete<TypeOperation>(
          `${this.baseUrl}/typeoperation/delete/${compteur}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}