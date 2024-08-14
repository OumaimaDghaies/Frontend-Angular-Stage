import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { TypePanne} from './managetypepanne';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageTypepanneService {
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

    getAllTypepanne(): Observable<TypePanne[]>{
        return this.http.get<TypePanne[]>(`${this.baseUrl}`+`/typepanne/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveTypepanne(typepanne:TypePanne,newTypepanne:boolean): Observable<TypePanne>{
        TypePanne.newTypepanne=newTypepanne
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<TypePanne>(`${this.baseUrl}`+`/typepanne/create`, typepanne)//, httpOptions)
    }

    deleteTypePanne(id: number): Observable<TypePanne> {
        return this.http.delete<TypePanne>(
          `${this.baseUrl}/typepanne/delete/${id}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}