import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Panne} from './managepanne';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManagePanneService {
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

    getAllPanne(): Observable<Panne[]>{
        return this.http.get<Panne[]>(`${this.baseUrl}`+`/pannes/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    savePanne(Panne:Panne,newPanne:boolean): Observable<Panne>{
        Panne.newPanne=newPanne
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<Panne>(`${this.baseUrl}`+`/pannes/create`, Panne)//, httpOptions)
    }

    deletePanne(id: number): Observable<Panne> {
        return this.http.delete<Panne>(
          `${this.baseUrl}/pannes/delete/${id}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}