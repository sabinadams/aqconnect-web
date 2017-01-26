import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {
  constructor(private _httpClient: HttpClient, private _http: Http) {}
  user = JSON.parse(localStorage.getItem('user'));
  //Likes and unlikes forum posts
  checkNotifications(){
    let data = {'userID': this.user.Id, 'token': this.user.token};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/checknotifications/', {'data':data}) // ...using post request
    .map((res:Response) => {
        return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}