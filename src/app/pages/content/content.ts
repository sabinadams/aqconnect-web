import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content-service';
//Required to use jQuery
declare var $: any;
@Component({
  templateUrl: './content.html',
  styleUrls: ['./content.css']
})
export class ContentPage implements OnInit{
	constructor(private _router: Router, private _contentService: ContentService){}
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
		this._contentService.getItemsByType(1).subscribe(res => { this.items = res; });
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
    	this._router.navigate(['/content', {outlets: {'contentpage': [`${this.detail_link}`, itemID]}}]);
    }
		
}
