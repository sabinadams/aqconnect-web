import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var $: any;
@Injectable()
export class ServerStatusService {
  constructor(private _http: HttpClient) {}  
  //Grabs the AQ3D Servers and their stats
  getStats(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/serverstats/').map( (res) => {
      return res.json().Filecontent;
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}