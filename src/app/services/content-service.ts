import { Injectable } from '@angular/core';
import { HttpClient } from './http-service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {
  constructor(private _http: HttpClient) {}

// **********************************************************************************************************
// *                                                                                
// *  Non-Specific Content Stuff (Categories, Types, All Items, etc...) 
// *        
// **********************************************************************************************************

  //Grabs all Content Types (Armor, Weapon, etc...)
  getContentTypes(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/contentTypes/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs all Content Categories (Locations, Quests, etc...)
  getContentCategories(){
    return this._http.get('http://aq.trycf.com/api/index.cfm/categories/').map( (res) => {
      return res.json();
    }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


// **********************************************************************************************************
// *                                                                                
// *  Calls for Items
// *        
// **********************************************************************************************************

  //Grabs all items depending on type [1,2,3,4,5,6,7,8,11]
  getItemsByType(typeID: number){
  	  return this._http.get(`http://aq.trycf.com/api/index.cfm/content/type/${typeID}`).map( (res) => {
        return res.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Grabs an individual item based on a given ID.
  getItemByID(id: number) {
  	return this._http.get(`http://aq.trycf.com/api/index.cfm/itemInfo/${id}`).map( (res: Response) => {
  		return res.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


// **********************************************************************************************************
// *                                                                                
// * Calls Build Stat Calculator Stuffs (All Items/Soon will have all Base User Stats)
// *        
// **********************************************************************************************************

  getCalculatorContent(){
    return this._http.get(`http://aq.trycf.com/api/index.cfm/calculator/`).map( (res: Response) => {
      return res.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


// **********************************************************************************************************
// *                                                                                
// * Calls for Non-Items 
// *        
// **********************************************************************************************************

  //Grabs all non-items depending on source
  getContentBySource( source: string ){
      return this._http.get(`http://aq.trycf.com/api/index.cfm/subCategories/${source}`).map( (res) => {
        return res.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

// **********************************************************************************************************
// *                                                                                
// * Calls for Non-Items by ID
// *        
// **********************************************************************************************************

  getContentByIDSource(id: number, source: string) {
    return this._http.get(`http://aq.trycf.com/api/index.cfm/subCategory/${source}/${id}/`).map( (res: Response) => {
      return res.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}