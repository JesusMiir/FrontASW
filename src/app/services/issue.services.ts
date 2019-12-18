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

    edit(id, issue, token) {
        let params = JSON.stringify(issue);
        let headers = new HttpHeaders({'Content-Type':'application/json', 'api_key':token});
        return this._http.put(this.url + '/' + id, params, {headers: headers});
    }

    editStatus(id, status, token) {
        let headers = new HttpHeaders({'Content-Type':'application/json', 'api_key':token});
        return this._http.put(this.url + '/' + id + '/status', status, {headers: headers});
    }

    getIssue(id):Observable<any> {
        return this._http.get(this.url + '/' + id);
    }

    getIssues(filter,order, sort, value):Observable<any> {
        var url = this.url;
        if (filter != null || order != null || sort != null || value != null) {
            url += '?';
            if (filter != null) {
                url += 'filter='+filter;
                if (order != null) url += '&order='+order;
                if (sort != null) url += '&sort='+sort;
                if (value != null) url += '&value='+value;
            }
            else if (order != null) {
                url += 'order='+order;
                if (sort != null) url += '&sort='+sort;
                if (value != null) url += '&value='+value;
            }
            else if (sort != null) {
                url += 'sort='+sort;
                if (value != null) url += '&value='+value;
            }
            else url += 'value='+value;
        }
        return this._http.get(url);
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