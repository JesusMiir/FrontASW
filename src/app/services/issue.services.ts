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

    getIssues(filter,order, sort, value):Observable<any> {
        let headers = new HttpHeaders({'Content-Type':'application/json', "api_key": null});
        let params = new HttpParams().set("filter", filter).set("order", order).set("sort", sort).set("value", value); 

        return this._http.get(this.url);
    }

    createVote(id, token):Observable<any> {
        let headers = new HttpHeaders({'Content-Type':'application/json', "api_key": token});
        return this._http.post(this.url + '/' + id + '/vote', null, {headers: headers});
    }

    deleteVote(id, token):Observable<any> {
        let headers = new HttpHeaders({'Content-Type':'application/json', "api_key": token});
        return this._http.delete(this.url + '/' + id + '/vote', {headers: headers});
    }

    createWatch(id, token):Observable<any> {
        let headers = new HttpHeaders({'Content-Type':'application/json', "api_key": token});
        return this._http.post(this.url + '/' + id + '/watch', null, {headers: headers});
    }

    deleteWatch(id, token):Observable<any> {
        let headers = new HttpHeaders({'Content-Type':'application/json', "api_key": token});
        return this._http.delete(this.url + '/' + id + '/watch' , {headers: headers});
    }
}