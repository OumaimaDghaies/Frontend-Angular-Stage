import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

import { Famille, SousFamille } from './managefamille';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../_services/user';

@Injectable()
export class ManageFamilleService {
  //private baseUrl = environment.apiUrl;
  //private baseUrl = "http://localhost:8085/springbootrestapi/api";
  private baseUrl = environment.apiUrl;

  currentuser: User = new User();

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {
    this.currentuser = this.tokenService.getUser();
  }

  getAllFamilles(): Observable<any[]> {
    return this.http.get<Famille[]>(`${this.baseUrl}` + `/familles/read`);
    //.then((data: Vehicule[]) => {
    //    return data; });
  }
  getAllSousFamilles(): Observable<any[]> {
    return this.http.get<SousFamille[]>(
      `${this.baseUrl}` + `/sousfamilles/read`
    );
    //.then((data: Vehicule[]) => {
    //    return data; });
  }

  saveSousFamille(
    sousfamille: SousFamille,
    newsousfamille: boolean
  ): Observable<SousFamille> {
    sousfamille.newsousfamille = newsousfamille;
    console.log('jkhjk' + JSON.stringify(sousfamille));
    return this.http.post<SousFamille>(
      `${this.baseUrl}` + `/sousfamilles/create`,
      sousfamille
    ); //, httpOptions)
  }

  updateSousFamille(sousfamille: SousFamille): Observable<SousFamille> {
    return this.http.put<SousFamille>(
      `${this.baseUrl}/sousfamilles/update/${sousfamille.idsousfamille}`,
      sousfamille
    );
  }

  deleteSousFamille(idsousfamille: number): Observable<SousFamille> {
    return this.http.delete<SousFamille>(
      `${this.baseUrl}/sousfamilles/delete/${idsousfamille}`
    );
  }

  saveFamille(famille: Famille, newfamille: boolean): Observable<Famille> {
    famille.newfamille = newfamille;
    console.log('jkhjk' + JSON.stringify(famille));
    return this.http.post<Famille>(
      `${this.baseUrl}` + `/familles/create`,
      famille
    ); //, httpOptions)
  }

  deleteFamille(id: number): Observable<Famille> {
    return this.http.delete<Famille>(
      `${this.baseUrl}/familles/delete/${id}`
    );
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    //let response = this.getAllSousFamilles();

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([]); //,response2]);
  }
}
