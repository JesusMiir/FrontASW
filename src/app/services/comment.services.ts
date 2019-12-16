import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './gloabl';

@Injectable() 
export class CommentService {
    public url: string;
    public identity;
    public token;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url+'issues';
    }

    create(id, comment, token) {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders({'Content-Type':'application/json', 'api_key':token});

        return this._http.post(this.url + '/' + id + '/comments', params, {headers: headers});
    }
    /*
    edit(id, comment, token) {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders({'Content-Type':'application/json', 'api_key':token});

        return this._http.put(this.url + '/' + id + '/comments/' + comment.id, params, {headers: headers});
    }
    */
    delete(id, idComment, token) {
        let headers = new HttpHeaders({'Content-Type':'application/json', 'api_key':token});
        return this._http.delete(this.url + '/' + id + '/comments/' + idComment, {headers: headers});
    }

    getComments(id):Observable<any> {
        return this._http.get(this.url + '/' + id + '/comments');
    }
}