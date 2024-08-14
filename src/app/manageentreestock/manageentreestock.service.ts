import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import { EntreeStock, DetailsEntreeStock} from './manageentreestock';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageEntreeStockService {
   
    //private baseUrl = environment.apiUrl;
    //private baseUrl = "http://localhost:8085/springbootrestapi/api";
    private baseUrl = environment.apiUrl;

    currentuser:User=new User();

    constructor(private http: HttpClient,private tokenService:TokenStorageService) {
        this.currentuser=this.tokenService.getUser();
     }

    
    getAllEntreeStock(): Observable<any[]>{
        return this.http.get<EntreeStock[]>(`${this.baseUrl}`+`/entreestock/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }

   
  deleteEntreeStock(compteur: number): Observable<EntreeStock> {
    return this.http.delete<EntreeStock>(
      `${this.baseUrl}/entreestock/delete/${compteur}`
    );
  }

    

   
    
    saveEntreeStock(entreestock:EntreeStock,newentreestock:boolean): Observable<EntreeStock>{
        entreestock.newentreestock=newentreestock
        console.log("jkhjk"+JSON.stringify(entreestock))
        return this.http.post<EntreeStock>(`${this.baseUrl}`+`/entreestock/create`, entreestock)//, httpOptions)
    }

    saveDetailsEntreeStock(detailsentreestock:DetailsEntreeStock,newdetailsentreestock:boolean): Observable<DetailsEntreeStock>{
        detailsentreestock.newdetailsentreestock=newdetailsentreestock
        console.log("jkhjk"+JSON.stringify(detailsentreestock))
        return this.http.post<DetailsEntreeStock>(`${this.baseUrl}`+`/detailsentreestock/create`, detailsentreestock)//, httpOptions)
    }

    public requestDataFromMultipleSources(): Observable<any[]> {
       
        //let response3 = this.getAllApprovalLevel1Familles();
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

}