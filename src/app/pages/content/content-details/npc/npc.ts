import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';

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
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
}
