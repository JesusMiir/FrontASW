import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './gloabl';

@Injectable() 
export class UserService {
    public url: string;
    public identity;
    public token;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url+'users';
    }

    signup(user_to_login):Observable<any> {
        let params = JSON.stringify(user_to_login);

        let headers = new HttpHeaders({'Content-Type':'application/json'});

        return this._http.get(this.url+'/regenerateToken', {headers: headers});
    }

    register(usuario): Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this._http.get(this.url, {headers: headers}); 
    }

    getIdentity() {
        let identity = localStorage.getItem('identity');
      //let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != 'undefined') {
          this.identity = identity;
        }
        else {
          this.identity = null;
        }
        return this.identity;
      } 
    
    getToken() {
        let token = localStorage.getItem('token');
        //let token = JSON.parse(localStorage.getItem('token'));
        if(token != 'undefined') {
          this.token = token;
        }
        else {
          this.token = null;
        }
        return this.token;
    }
}

