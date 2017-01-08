import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';


@Component({
  selector: 'shop',
  templateUrl: './shop.html',
  styleUrls: ['./shop.css', '../../../../shared/detail-pages-shared.css']
})
export class ShopPage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	shop:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'shoppes').subscribe(res => {this.shop = res;}); // (+) converts string 'id' to a number
	    });
	}

	openRoute(id, source){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${source}page`, id]}}]);
    }
	
}
