import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
  constructor(private _http: HttpClient) {}
 
  //Grabs last 3 news articles
  getNewsHome(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/newshome/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs all news
  getNews(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/news/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Get News By ID
  getNewsByID(newsID){
    return this._http.get(`http://aq.trycf.com/api/index.cfm/newsInfo/${newsID}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


}