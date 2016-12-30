import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team-service';
import { NewsService } from '../../services/news-service';

//Required to use jQuery
declare var $: any;

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit{
	constructor(private _router: Router, private _teamService: TeamService, private _newsService: NewsService){}
	team: any;
	current_member:any;
	news = [];
	ngOnInit(){

		this._teamService.getStaff().subscribe(res => { this.team = res; });
		this._newsService.getNewsHome().subscribe(res => { this.news = res;});

		//jQuery before rendering
	    $('body').scrollspy({target: '.navbar-fixed-top', offset: 60 });
	    $('#topNav').affix({offset: {top: 200}});	    
	    $('a.page-scroll').bind('click', function(event) {
	        var $ele = $(this);
	        $('html, body').stop().animate({scrollTop: ($($ele.attr('href')).offset().top - 60)}, 1450, 'easeInOutExpo');
	        event.preventDefault();
	    }); 
	    $('.navbar-collapse ul li a').click(function() {
	        $('.navbar-toggle:visible').click();
	    });
	    $('#galleryModal').on('show.bs.modal', function (e) {
	       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
	    });
                          
	}

	//Switches team member info when you click their image in the team section
	focusMember(member){
		this.current_member = member;
	}
	openDetail(newsID){
    	this._router.navigate(['/news', {outlets: {'newspage': ['newsdetail', newsID]}}]);
    }
	
}
