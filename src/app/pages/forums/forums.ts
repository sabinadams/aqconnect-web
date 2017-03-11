import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum-service';

@Component({
  templateUrl: './forums.html',
  styleUrls: ['./forums.css']
})
export class ForumsPage implements OnInit{
	constructor(private _router: Router, private _forumService: ForumService){}
	forums:any;
	ngOnInit(){
		this._forumService.getForums().subscribe(res => {console.log(res); this.forums = res;});
	}

	openForum(forumID){
		this._router.navigate(['/forumpage', forumID]);
	}
}
