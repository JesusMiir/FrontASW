import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './gloabl';

@Injectable() 
export class IssueService {

    public url: string;
    public identity;
    public token;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url+'issues';
    }
    
    create(issue, token):Observable<any> {
        let params = JSON.stringify(issue);
        let headers = new HttpHeaders({'Content-Type':'application/json', 'api_key':token});

        return this._http.post(this.url, params, {headers: headers});
    }

    getIssue(id):Observable<any> {
        return this._http.get(this.url + '/' + id);
    }

    getIssues():Observable<any> {
        let headers = new HttpHeaders({'Content-Type':'application/json', "api_key": null});
        let params = new HttpParams().set("filter", null).set("order", null).set("sort", null).set("value", null); 

        return this._http.get(this.url);
    }
}