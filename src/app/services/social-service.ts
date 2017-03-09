import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialService {
  constructor(private _httpClient: HttpClient, private _http: Http) {}

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

  //Likes and unlikes posts
  likePost(data){
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/likepost/', {'data':data}) // ...using post request
    .map((res:Response) => {
        if(res.status == 200 && res.statusText == "OK"){let data = res.json(); return data;}
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Shares posts
  sharePost(post){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'post': post, 'user': user};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/sharepost/', {'data':data}) // ...using post request
    .map((res:Response) => {
        return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Deletes a Post
  deletePost(post){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'post': post, 'user': user};
    return this._httpClient.post(`http://aq.trycf.com/api/index.cfm/deletepost/`, {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getNewPosts(start){
    let userID = JSON.parse(localStorage.getItem('user')).Id;
    return this._httpClient.get(`http://aq.trycf.com/api/index.cfm/newposts/${userID}/${start}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getComments(userID, postID, start){
    return this._httpClient.get(`http://aq.trycf.com/api/index.cfm/comments/${userID}/${postID}/${start}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Likes and unlikes comments
  likeComment(data){
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/likecomment/', {'data':data}) // ...using post request
    .map((res:Response) => {
        if(res.status == 200 && res.statusText == "OK"){let data = res.json(); return data;}
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveComment(comment){
    let data = {'comment': comment, 'user': JSON.parse(localStorage.getItem('user'))};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/savecomment/', {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Deletes a Comment
  deleteComment(comment){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'comment': comment, 'user': user};
    return this._httpClient.post(`http://aq.trycf.com/api/index.cfm/deletecomment/`, {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveReply(reply){
    let data = {'reply': reply, 'user': JSON.parse(localStorage.getItem('user'))};
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/savereply/', {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getReplies(userID, commentID, postID, start){
    return this._httpClient.get(`http://aq.trycf.com/api/index.cfm/replies/${userID}/${commentID}/${postID}/${start}`).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Deletes a Comment
  deleteReply(reply){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'reply': reply, 'user': user};
    return this._httpClient.post(`http://aq.trycf.com/api/index.cfm/deletereply/`, {'data': data}).map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Likes and unlikes replies
  likeReply(data){
    return this._httpClient.post('http://aq.trycf.com/api/index.cfm/likereply/', {'data':data}) // ...using post request
    .map((res:Response) => {
        if(res.status == 200 && res.statusText == "OK"){let data = res.json(); return data;}
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}