import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { ProduitFini} from './manageproduitfini';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageProduitFiniService {
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

    getAllProduitFini(): Observable<ProduitFini[]>{
        return this.http.get<ProduitFini[]>(`${this.baseUrl}`+`/produitFinis/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }

    //console.log("jkhjk"+JSON.stringify(PFini))
    saveProduitFini(produitFini: ProduitFini): Observable<ProduitFini> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log("jkhjk"+JSON.stringify(produitFini))
        return this.http.post<ProduitFini>(`${this.baseUrl}/produitFinis/create`, produitFini, { headers });
      }

      deleteProduitFini(id: number): Observable<ProduitFini> {
        return this.http.delete<ProduitFini>(
          `${this.baseUrl}/produitFinis/delete/${id}`
        );
      }
    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}