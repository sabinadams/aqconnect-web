import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';
declare var $: any;
@Component({
  selector: 'location',
  templateUrl: './location.html',
  styleUrls: ['./location.css', '../../../../shared/detail-pages-shared.css']
})
export class LocationPage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	location: any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'locations').subscribe(res => {console.log(res); this.location = res;}); // (+) converts string 'id' to a number
      		if($('body').attr("class") != "modal-open"){
   		    	document.getElementById('toggler').click();
   		    }
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/content', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
	
}
