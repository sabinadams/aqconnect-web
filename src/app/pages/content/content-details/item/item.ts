import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { ContentService } from '../../../../services/content-service';

@Component({
  selector: 'item',
  templateUrl: './item.html',
  styleUrls: ['./item.css', '../../../../shared/detail-pages-shared.css']
})
export class ItemPage implements OnInit{
	constructor(private _location: Location, private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	item:any;
	malemodel = false; femalemodel = false; model = false;
	srcMale: any; srcFemale: any;

	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getItemByID(+params['id']).subscribe(res => {
	       		this.item = res;
	       		this.srcMale = "https://sketchfab.com/models/" + res.male_model_uuid + "/embed?autostart=1";
	       		this.srcFemale = "https://sketchfab.com/models/" + res.female_model_uuid + "/embed?autostart=1";
	       }); // (+) converts string 'id' to a number
	    	
	    });
	}

	openRoute(id, source){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
	toggleMale3D(){
		this.malemodel = !this.malemodel;
	}
	toggleFemale3D(){
		this.femalemodel = !this.femalemodel;
	}
	toggleModel(){
		this.model = !this.model;
	}
}
