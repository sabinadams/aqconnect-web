import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';

@Component({
  selector: 'quest',
  templateUrl: './quest.html',
  styleUrls: ['./quest.css', '../../../../shared/detail-pages-shared.css']
})
export class QuestPage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	quest:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'quests').subscribe(res => {this.quest = res;}); // (+) converts string 'id' to a number
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
}
