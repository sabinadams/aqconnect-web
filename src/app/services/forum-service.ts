import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ForumService {
  constructor(private _http: HttpClient) {}

  //Grabs all Forums
  getForums(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/forums/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs all Forums
  //Starting point is to help with loading only chunks of posts/replies
  getPostsByForum(forum, user, start){
    return this._http.get(`http://aq.trycf.com/api/index.cfm/forums/posts/${forum}/${user}/${start}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Gets Forum Posts By User
  getPostsByUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    return this._http.get(`http://aq.trycf.com/api/index.cfm/userforumposts/${user.Id}/${user.token}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  //Gets Forum Posts By User
  deleteForumPost(post){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'post': post, 'user': user};
    return this._http.post(`http://aq.trycf.com/api/index.cfm/deleteforumpostsafe/`, {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  //Gets Forum Posts By User
  deleteForumReply(reply){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'reply': reply, 'user': user};
    return this._http.post(`http://aq.trycf.com/api/index.cfm/deleteforumreply/`, {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs all Forums
  //Starting point is to help with loading only chunks of posts/replies
  getPostsByID(postID, userID, start){
    return this._http.get(`http://aq.trycf.com/api/index.cfm/posts/${postID}/${userID}/${start}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Likes and unlikes forum post replies
  likeReply(data){
    return this._http.post('http://aq.trycf.com/api/index.cfm/likeforumreply/', {'data':data}) // ...using post request
    .map((res:Response) => {
        if(res.status == 200 && res.statusText == "OK"){let data = res.json(); return data;}
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Likes and unlikes forum posts
  likePost(data){
    return this._http.post('http://aq.trycf.com/api/index.cfm/likeforumpost/', {'data':data}) // ...using post request
    .map((res:Response) => {
        if(res.status == 200 && res.statusText == "OK"){let data = res.json(); return data;}
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  reply(data){
    return this._http.post('http://aq.trycf.com/api/index.cfm/saveForumReply/', {'data':data}) // ...using post request
    .map((res) => {
        if(res.status == 200 && res.statusText == "OK"){
            return res;
         } else {
           return "Error";
         }
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  post(data){
    return this._http.post('http://aq.trycf.com/api/index.cfm/saveForumPost/', {'data':data}) // ...using post request
    .map((res) => {
        if(res.status == 200 && res.statusText == "OK"){
            return res;
         } else {
           return "Error";
         }
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}