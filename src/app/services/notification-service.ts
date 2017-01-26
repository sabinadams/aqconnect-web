import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {
  constructor(private _httpClient: HttpClient, private _http: Http) {}
  
  //Likes and unlikes forum posts
  checkNotifications(){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'userID': user.Id, 'token': user.token};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/checknotifications/', {'data':data}) // ...using post request
    .map((res:Response) => {
        return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  clearAllNotifications(){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'userID': user.Id, 'token': user.token};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/clearallnotifications/', {'data':data}) // ...using post request
    .map((res:Response) => {
        return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  readNotification( ID ){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'userID': user.Id, 'token': user.token, 'notificationID': ID};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/readnotification/', {'data':data}) // ...using post request
    .map((res:Response) => {
        return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}