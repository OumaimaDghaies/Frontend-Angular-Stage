import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { Gamme} from './managegamme';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageGammeService {
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

    getAllGamme(): Observable<Gamme[]>{
        return this.http.get<Gamme[]>(`${this.baseUrl}`+`/gammes/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveGamme(gamme:Gamme,newgamme:boolean): Observable<Gamme>{
        gamme.newgamme=newgamme
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<Gamme>(`${this.baseUrl}`+`/gammes/create`, gamme)//, httpOptions)
    }

    deleteGamme(compteur: number): Observable<Gamme> {
        return this.http.delete<Gamme>(
          `${this.baseUrl}/gammes/delete/${compteur}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}