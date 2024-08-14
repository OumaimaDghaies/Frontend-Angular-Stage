import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Preparation} from './managepreparation';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManagePreparationService {
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

    getAllPreparation(): Observable<Preparation[]>{
        return this.http.get<Preparation[]>(`${this.baseUrl}`+`/preparation/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    savePreparation(preparation:Preparation,newPreparation:boolean): Observable<Preparation>{
        preparation.newPreparation=newPreparation
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<Preparation>(`${this.baseUrl}`+`/preparation/create`, preparation)//, httpOptions)
    }

    deletePreparation(compteur: number): Observable<Preparation> {
        return this.http.delete<Preparation>(
          `${this.baseUrl}/preparation/delete/${compteur}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}