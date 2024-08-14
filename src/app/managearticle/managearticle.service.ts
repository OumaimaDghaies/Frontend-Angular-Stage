import { Article } from './managearticle';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, take, lastValueFrom } from 'rxjs';
import { Observable,forkJoin } from 'rxjs';
import{ environment } from '../../environments/environment';

import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'

@Injectable()
export class ManageArticleService {
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

    getAllArticle(): Observable<Article[]>{
        return this.http.get<Article[]>(`${this.baseUrl}`+`/article/read`)
        //.then((data: Vehicule[]) => {
        //    return data; });
    }


    saveArticle(article:Article): Observable<Article>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log("jkhjk"+JSON.stringify(article))
        return this.http.post<Article>(`${this.baseUrl}`+`/article/create`, article, { headers })//, httpOptions)
    }

    public requestDataFromMultipleSources(): Observable<any[]> {
       
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([])//,response2]);
      }

      deleteArticle(id: number): Observable<Article> {
        return this.http.delete<Article>(
          `${this.baseUrl}/article/delete/${id}`
        );
      }

}