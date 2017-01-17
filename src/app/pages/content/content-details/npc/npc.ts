import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';
declare var $: any;
@Component({
  selector: 'npc',
  templateUrl: './npc.html',
  styleUrls: ['./npc.css', '../../../../shared/detail-pages-shared.css']
})
export class NPCPage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	npc:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'npcs').subscribe(res => {this.npc = res;}); // (+) converts string 'id' to a number
	       if($('body').attr("class") != "modal-open"){
   		    	document.getElementById('toggler').click();
   		    }
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/content', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
}
