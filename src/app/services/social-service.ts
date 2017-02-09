import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialService {
  constructor(private _http: HttpClient) {}

  //Grabs all Content Types (Armor, Weapon, etc...)
  savePost(post){
    let data = {'post': post, 'user': JSON.parse(localStorage.getItem('user'))};
    return this._http.post('http://aq.trycf.com/api/index.cfm/savepost/', {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPosts(index){
    let userID = JSON.parse(localStorage.getItem('user')).Id;
    return this._http.get(`http://aq.trycf.com/api/index.cfm/posts/${userID}/${index}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


}