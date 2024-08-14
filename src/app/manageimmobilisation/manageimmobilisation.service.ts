import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Immobilisation} from './manageimmobilisation';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageImmobilisationService {
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

    getAllImmobilisation(): Observable<Immobilisation[]>{
        return this.http.get<Immobilisation[]>(`${this.baseUrl}`+`/immobilisation/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveImmobilisation(immobilisation:Immobilisation,newImmobilisation:boolean): Observable<Immobilisation>{
        immobilisation.newImmobilisation=newImmobilisation
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<Immobilisation>(`${this.baseUrl}`+`/immobilisation/create`, immobilisation)//, httpOptions)
    }
    deleteImmobilisation(compteur: number): Observable<Immobilisation> {
        return this.http.delete<Immobilisation>(
          `${this.baseUrl}/immobilisation/delete/${compteur}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}