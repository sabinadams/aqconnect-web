import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';
declare var $: any;
@Component({
  selector: 'dungeon',
  templateUrl: './dungeon.html',
  styleUrls: ['./dungeon.css', '../../../../shared/detail-pages-shared.css']
})
export class DungeonPage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	dungeon:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'dungeons').subscribe(res => {this.dungeon = res;}); // (+) converts string 'id' to a number
	       setTimeout(() => {
	       		if($('body').attr("class") != "modal-open"){
	   		    	document.getElementById('toggler').click();
	   		    }
	       }, 200);
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/content', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
	
}
