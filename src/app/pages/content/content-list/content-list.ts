import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../services/content-service';
//Required to use jQuery
declare var $: any;
@Component({
  templateUrl: './content-list.html',
  styleUrls: ['./content-list.css']
})
export class ContentListPage implements OnInit{
	constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _contentService: ContentService){}
	content_types: any;
	items: any;
	categories:any;
	isClosed = false;
	title = 'Armors';
	detail_link = 'itemspage';
	itemType = 1;
	filtertype = "alpha";

	// Grabs data on page initialization
	ngOnInit(){
		this._contentService.getContentTypes().subscribe(res => { this.content_types = res; });
		this._contentService.getContentCategories().subscribe(res => { this.categories = res.slice(1); });
		this._activeRoute.params.subscribe(params => {
			if(params['type'].length <= 2){
				this._contentService.getItemsByType(+params['type']).subscribe(res => { this.items = res; });
				switch(+params['type']){
					case 1:this.title = "Armors"; break;
					case 2: this.title = "Weapons"; break;
					case 3: this.title = "Helms"; break;
					case 4: this.title = "Boots"; break;
					case 5: this.title = "Gloves"; break;
					case 6: this.title = "Classes"; break;
					case 7: this.title = "Belts"; break;
					case 8: this.title = "Shoulderplates"; break;
					case 9: this.title = "Misc. Items"; break;
					case 10: this.title = "Temp. Items"; break;
					case 11: this.title = "Capes"; break;
					case 12: this.title = "Useable Items"; break;
				}
			} else {
				this._contentService.getContentBySource(params['type']).subscribe(res => {this.items = res; });
				this.title = params['type'].substring(0,1).toUpperCase() + params['type'].substring(1);
			}
	    });
	}

	// * Toggles the side menu using jQuery and grabs the data relating to the option
	menuToggle(category?, type?, category_name?) {
		var [trigger, overlay, wrapper] = [$('.hamburger'),$('.overlay'),$('#wrapper')];
		if (this.isClosed) { 
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
		} else {  
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
		} 
		wrapper.toggleClass('toggled');
		this.isClosed = !this.isClosed;
		
		if(category){
			this.items = [];
			if(type && type == 'non-item'){
				this.title = category_name;
				this._contentService.getContentBySource(category).subscribe(res => {this.items = res;});
				this.detail_link = category + 'page';
				this.itemType = 0;
			} else {
				this.title = type;
				this._contentService.getItemsByType(category).subscribe(res => {this.items = res;});
				this.detail_link = 'itemspage';
				this.itemType = 1;
			}
		
		}
    }
    openDetail(itemID){
    	this._router.navigate(['/contentlist', {outlets: {'contentpage': [`${this.detail_link}`, itemID]}}]);
    }
		
}
