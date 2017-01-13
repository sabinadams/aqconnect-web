import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { TeamService } from '../../services/team-service';

//Required to use jQuery
declare var $: any;

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage implements OnInit{
	constructor(private _authService: AuthService, private _router: Router, private _teamService: TeamService){}
	team: any;
	current_member:any;

	ngOnInit(){
		if(localStorage.getItem('user') && localStorage.getItem('token')){
			this._router.navigate(['home']);
		}
		this._teamService.getStaff().subscribe(res => { this.team = res; });
		// all Parallax Section
		$(window).load(function(){
			$("#content").parallax("50%", 0.3);
			$("#aenews").parallax("50%", 0.3);
		});
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

	login(email, password){
		this._authService.login(email, password).subscribe(res => {
			(res.success == false) ? alert('Invalid login info. Try again please.') : this._router.navigate(['home']);
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
