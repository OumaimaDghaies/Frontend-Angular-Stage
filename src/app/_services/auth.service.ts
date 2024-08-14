import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment } from '../../environments/environment';

//const AUTH_API = 'http://localhost:8085/springbootrestapi/api/auth/';
const AUTH_API = environment.apiUrl+'/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { 
    //console.log("AUTH_API"+AUTH_API)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }


  /*Userregister(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }*/

  Companyregister(companyname: string, email: string): Observable<any> {
    return this.http.post(AUTH_API + 'signupcompany', {
      companyname,
      email
    }, httpOptions);
  }
}
