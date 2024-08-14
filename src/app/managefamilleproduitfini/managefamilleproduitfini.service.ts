import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { FamilleProduitFini} from './managefamilleproduitfini';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageFamilleProduitFiniService {
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

    getAllFamilleProduitFini(): Observable<FamilleProduitFini[]>{
        return this.http.get<FamilleProduitFini[]>(`${this.baseUrl}`+`/familleProduitFini/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveFamilleProduitFini(famillePFini:FamilleProduitFini,newfamillePFini:boolean): Observable<FamilleProduitFini>{
        famillePFini.newfamillePFini=newfamillePFini
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<FamilleProduitFini>(`${this.baseUrl}`+`/familleProduitFini/create`, famillePFini)//, httpOptions)
    }

    deleteFamilleProduitFini(id: number): Observable<FamilleProduitFini> {
        return this.http.delete<FamilleProduitFini>(
          `${this.baseUrl}/familleProduitFini/delete/${id}`
        );
      }

    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}