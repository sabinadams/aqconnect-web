import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';

@Component({
  selector: 'monster',
  templateUrl: './monster.html',
  styleUrls: ['./monster.css', '../../../../shared/detail-pages-shared.css']
})
export class MonsterPage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	monster:any;
	model = false;
	url:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'monsters').subscribe(res => {
	       		this.monster = res;
	       		this.url = "https://sketchfab.com/models/" + res.model_uuid + "/embed?autostart=1";
	       }); // (+) converts string 'id' to a number
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
    toggleModel(){
		this.model = !this.model;
	}
}
