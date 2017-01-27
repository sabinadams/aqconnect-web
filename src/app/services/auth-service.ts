import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from './http-service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private _http: Http, private router: Router, private _customHTTP: HttpClient) {}

  //Creates randomized UUID Token for authentication
   _createUUID() {
      var d = new Date().getTime();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
          let r = ( d + Math.random() * 16 ) % 16 | 0;
          d = Math.floor( d / 16 );
          return( c == 'x' ? r : ( r & 0x7 | 0x8 ) ).toString( 16 );
      });
    }

  changePassword(reset_token, password, email){
    let data = {'reset_token':reset_token, 'password': password, 'email': email};
    return this._http.post('http://aq.trycf.com/api/index.cfm/resetpassword', data) // ...using post request
    .map((res:Response) => {
       return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Creates Account
  createAccount(user){
    user['device_token'] = this._createUUID();
    let data = {'user':user};
    return this._http.post('http://aq.trycf.com/api/index.cfm/register', data) // ...using post request
    .map((res:Response) => {
       return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  disableAccount( pass ){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'userID': user.Id, 'password':pass, 'token': user.device_token};
    return this._customHTTP.post('http://aq.trycf.com/api/index.cfm/disableaccount', data) // ...using post request
    .map((res:Response) => {
       return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 


  //Creates Account
  sendForgotPasswordEmail(email){
    let data = {'email':email};
    return this._http.post('http://aq.trycf.com/api/index.cfm/forgotpassword', data) // ...using post request
    .map((res:Response) => {
       return res.json();
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }



  //Logs user in
  login(email, password){
    //Email/Password/Token sent to API for validation in JSON form
    let data = {'username': email, 'password': password, 'token': this._createUUID()};
    return this._http.post('http://aq.trycf.com/api/index.cfm/login', data) // ...using post request
    .map((res:Response) => {
        //If successful store the user and token into local storage
        let data =  res.json();
        if(data.success){
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        }else {
          return {'success': false};
        }
     }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Logs user out, deauthenticates them, and sends to login screen
  logout(){
     let user = JSON.parse(localStorage.getItem('user'));
     let data = { 'user_ID': user.Id, 'token': user.token};
     return this._http.post('http://aq.trycf.com/api/index.cfm/logoutpub', data) // ...using post request
      .map((res:Response) => {
          //If successful store the user and token into local storage
          if(res.status == 200){
            let data = res.json();
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return data;
          }
       }) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
  }

  //Checks to see if user is still available in local storage (still logged in)
  isLoggedIn(){
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      return true;
    }else {
      return false;
    }
  }

  changeUserName(newname){

    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'newUsername': newname, 'oldUsername': user.username, 'email': user.email, 'token': user.device_token};
    return this._customHTTP.post('http://aq.trycf.com/api/index.cfm/resetusername/', data).map( (res) => {
      if(res.json().user){
        let temp = JSON.parse(localStorage.getItem('user'));
        temp.username = res.json().user.name;
        localStorage.setItem('user', JSON.stringify(temp));
      }
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  changeEmail(newemail){
    
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'newemail': newemail, 'oldemail': user.email, 'token': user.device_token};
    return this._customHTTP.post('http://aq.trycf.com/api/index.cfm/resetemail/', data).map( (res) => {
      if(res.json().user){
        let temp = JSON.parse(localStorage.getItem('user'));
        temp.email = res.json().user.email;
        localStorage.setItem('user', JSON.stringify(temp));
      }
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  changeDescription(newdescription){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'newdescription': newdescription, 'email': user.email, 'token': user.device_token};
    return this._customHTTP.post('http://aq.trycf.com/api/index.cfm/resetdescription/', data).map( (res) => {
      if(res.json().user){
        let temp = JSON.parse(localStorage.getItem('user'));
        temp.description = res.json().user.description;
        localStorage.setItem('user', JSON.stringify(temp));
      }
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  changeFacebook(newfacebook){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'newfacebook': newfacebook, 'email': user.email, 'token': user.device_token};
    return this._customHTTP.post('http://aq.trycf.com/api/index.cfm/changefacebook/', data).map( (res) => {
      if(res.json().user){
        let temp = JSON.parse(localStorage.getItem('user'));
        temp.facebook = res.json().user.facebook;
        localStorage.setItem('user', JSON.stringify(temp));
      }
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  changeTwitter(newtwitter){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = {'newtwitter': newtwitter, 'email': user.email, 'token': user.device_token};
    return this._customHTTP.post('http://aq.trycf.com/api/index.cfm/changetwitter/', data).map( (res) => {
      if(res.json().user){
        let temp = JSON.parse(localStorage.getItem('user'));
        temp.twitter = res.json().user.twitter;
        localStorage.setItem('user', JSON.stringify(temp));
      }
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  changeProfilePic(image){
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers({ 'Authorization': `Client-ID 6108a749981cd34` });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('https://api.imgur.com/3/upload', {image: image.split(',')[1]}, options).map(res => {
       let data = {'email': user.email, 'imgUrl': res.json().data.link, 'imgDelete': res.json().data.deletehash, 'token': user.device_token};
       this._customHTTP.post('http://aq.trycf.com/api/index.cfm/resetprofilepic/', data).subscribe();
       let temp = JSON.parse(localStorage.getItem('user'));
       temp.image_url = res.json().data.link;
       temp.image_delete = res.json().data.deletehash;
       return {'user': temp, 'status': res.json()};
    });
  }

 }