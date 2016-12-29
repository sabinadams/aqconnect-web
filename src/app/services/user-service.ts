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
  getUserByID(userID){
    return this._http.get(`http://aq.trycf.com/api/index.cfm/user/${userID}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}