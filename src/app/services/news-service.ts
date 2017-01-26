import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
  constructor(private _httpClient: HttpClient, private _http: Http) {}
  userID = JSON.parse(localStorage.getItem('user')).Id;
  //Grabs last 3 news articles
  getNewsHome(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/newshome/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs all news
  getNews(){
    return this._httpClient.get(`http://aq.trycf.com/api/index.cfm/newsnew/${this.userID}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Get News By ID
  getNewsByID(newsID){
    return this._httpClient.get(`http://aq.trycf.com/api/index.cfm/newsInfoNew/${newsID}/${this.userID}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Likes and unlikes forum posts
  likePost(data){
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/likenews/', {'data':data}) // ...using post request
    .map((res:Response) => {
        if(res.status == 200 && res.statusText == "OK"){let data = res.json(); return data;}
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}