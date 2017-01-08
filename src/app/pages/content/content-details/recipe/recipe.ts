import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.html',
  styleUrls: ['./recipe.css', '../../../../shared/detail-pages-shared.css']
})
export class RecipePage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	recipe:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'recipes').subscribe(res => {this.recipe = res;}); // (+) converts string 'id' to a number
	    });
	}
	openRoute(id, source){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
}
