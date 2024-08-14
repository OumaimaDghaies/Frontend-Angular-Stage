import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { TypeMateriel} from './managetypemateriel';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageTypeMaterielService {
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

    getAllTypeMateriel(): Observable<TypeMateriel[]>{
        return this.http.get<TypeMateriel[]>(`${this.baseUrl}`+`/typemateriel/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveTypeMateriel(typemateriel:TypeMateriel,newTypeMateriel:boolean): Observable<TypeMateriel>{
      typemateriel.newTypeMateriel=newTypeMateriel
        //console.log("jkhjk"+JSON.stringify(employee))
        return this.http.post<TypeMateriel>(`${this.baseUrl}`+`/typemateriel/create`, typemateriel)//, httpOptions)
    }

    deleteTypeMateriel(compteur: number): Observable<TypeMateriel> {
        return this.http.delete<TypeMateriel>(
          `${this.baseUrl}/typemateriel/delete/${compteur}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}