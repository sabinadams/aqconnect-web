import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content-service';

@Component({
  templateUrl: './content.html',
  styleUrls: ['./content.css']
})
export class ContentPage implements OnInit{
	types:any;
	categories:any;
	constructor(private _router: Router, private _contentService: ContentService){}
	
	ngOnInit(){
		this._contentService.getContentTypes().subscribe(res => { console.log("Types", res); this.types = res; });
		this._contentService.getContentCategories().subscribe(res => { console.log("Categories", res);this.categories = res.slice(1); });
	}

	openList(type){
		this._router.navigate([`/contentlist/${type}`]);
	}
		
}
