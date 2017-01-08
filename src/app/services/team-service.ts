import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TeamService {
  constructor(private _http: HttpClient) {}
  //Grabs all staff members
  getStaff(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/contactUs/staff').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}