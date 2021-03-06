import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../../services/content-service';
declare var $: any;
@Component({
  selector: 'badge',
  templateUrl: './badge.html',
  styleUrls: ['./badge.css', '../../../../shared/detail-pages-shared.css']
})
export class BadgePage implements OnInit{
	constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _contentService: ContentService){}
	badge:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._contentService.getContentByIDSource(+params['id'], 'badges').subscribe(res => {this.badge = res;}); // (+) converts string 'id' to a number
	       setTimeout(() => {
	       		if($('body').attr("class") != "modal-open"){
	   		    	document.getElementById('toggler').click();
	   		    }
	       }, 200);
	    });
	}
}
