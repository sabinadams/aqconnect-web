import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {}

  //Grabs all users
  getAllUsers(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/allusers/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs a user by ID
  getUserByID(userID, senderID){
    return this._http.get(`http://aq.trycf.com/api/index.cfm/user/${userID}/${senderID}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  handleFollow( followID ){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = { 'follower': user.Id, 'token': user.token, 'followed': followID};
    return this._http.post(`http://aq.trycf.com/api/index.cfm/handlefollows/`, {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}