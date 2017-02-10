import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialService {
  constructor(private _httpClient: HttpClient, private _http: Http) {}

  //Grabs all Content Types (Armor, Weapon, etc...)
  savePost(post){
    let data = {'post': post, 'user': JSON.parse(localStorage.getItem('user'))};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/savepost/', {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPosts(index){
    let userID = JSON.parse(localStorage.getItem('user')).Id;
    return this._httpClient.get(`http://aq.trycf.com/api/index.cfm/posts/${userID}/${index}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  uploadPic(image){
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers({ 'Authorization': `Client-ID 6108a749981cd34` });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('https://api.imgur.com/3/upload', {image: image.split(',')[1]}, options).map(res => {
     return res.json();
    });
  }

}