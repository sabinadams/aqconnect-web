import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';
declare var $: any;
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
