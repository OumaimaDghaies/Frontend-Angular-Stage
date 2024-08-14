import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import{User} from '../_services/user'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable()
export class MenuService {
    private URL = '../../assets/data/menu.json';
    currentuser:User=new User();

    constructor(private http: HttpClient,private tokenService:TokenStorageService) {
        this.currentuser=this.tokenService.getUser();
    }

    readMenu():Observable<MenuItem[]>{
        return  this.http.get<MenuItem[]>('../../assets/data/menu.json')
        // let rst:MenuItem[]=[]
        // this.http
        // .get<any>('../../assets/data/menu.json').subscribe({
        //     next: (res) => {  
        //       rst=res.data
        //       console.log(rst)
              
        //   },
        //   error:(error)=>{
        //     console.log("error")
           
        //   }})

        //   return rst
    }
   
}