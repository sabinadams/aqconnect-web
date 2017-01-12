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
	showlist = false;
	// Grabs data on page initialization
	ngOnInit(){
		this._contentService.getContentTypes().subscribe(res => { this.content_types = res; });
		this._contentService.getContentCategories().subscribe(res => { this.categories = res.slice(1); });
	}

	openList(type){
		if(!isNaN(type)){
				this._contentService.getItemsByType(type).subscribe(res => { this.items = res; });
				switch(type){
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
				this._contentService.getContentBySource(type).subscribe(res => {this.items = res; });
				this.title = type.substring(0,1).toUpperCase() + type.substring(1);
			}
		this.showlist = true;
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
    openDetail(id){
    	this._router.navigate(['/content', {outlets: {'contentpage': [this.detail_link, id]}}]);
    }
		
}
