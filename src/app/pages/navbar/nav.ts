import { Component, OnInit ,OnChanges, Input, trigger, state, animate, transition, style} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ServerStatusService } from '../../services/server-status-service';
import { NotificationService } from '../../services/notification-service';
@Component({
  selector: 'navbar',
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('1 => 0', animate('500ms')),
      transition('0 => 1', animate('200ms'))
    ])
  ],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent implements OnInit{
	user:any;
	servers:any;
	constructor(private _router: Router, private _authService: AuthService, private _serverStatus: ServerStatusService, private _notificationService: NotificationService){}
	notification_check = false;
	notifications:any;
	notification_popup = false;
	start = 0;
	mostRecent:any;

	ngOnInit(){
		this.user = JSON.parse(localStorage.getItem('user'));
		this._serverStatus.getStats().subscribe((res) => {
			this.servers = JSON.parse(res);
		});
		if(localStorage.getItem('user')){
			this._notificationService.checkNotifications().subscribe(res => {
				if(res.status != 401 ){
					this.notifications = res;
					if(this.start + res.length < 100){
						this.start += res.length;
					}
					this.notification_check = false;
					for(let notification of this.notifications){
						if(notification.read == 0) {
							this.notification_check = true;
						}
					}
				} else {
					this.notifications = [];
					this.notification_check = false;
				}
			});
		}
		setInterval(() => {
			this.handleNotifications();
		}, 15000);
    }
	logout(){
		this._authService.logout().subscribe(res => {
			if(res.status == 200){
				this._router.navigate(['']);
			}
		});
	}

	handleNotifications(){
		if(localStorage.getItem('user')){
			this._notificationService.checkNotifications().subscribe(res => {
				if(res.status != 401 ){
					if(this.notifications.length < res.length){
						this.notification_popup = false;
						this.mostRecent = res[0];
						this.notification_popup = true;
						setTimeout(() => {
							this.notification_popup = false;
						}, 4000)
					}
					this.notifications = res;

					if(this.start + res.length < 100){
						this.start += res.length;
					}
					this.notification_check = false;
					for(let notification of this.notifications){
						if(notification.read == 0) {
							this.notification_check = true;
						}
					}
				} else {
					this.notifications = [];
					this.notification_check = false;
				}
			});
		}
	}

	clearAllNotifications(){
		this._notificationService.clearAllNotifications().subscribe(res => {
			this.handleNotifications();
			this.notification_check = false;
		});
		this.notifications = [];
	}

	readNotification(notification){
		this._notificationService.readNotification(notification.ID).subscribe(res => {
			this.handleNotifications();
		});
	}

	gotoNotification(notification){
		this._notificationService.readNotification(notification.ID).subscribe(res => {
			this.handleNotifications();
			this._notificationService.gotoNotification(notification.type, notification.item_ID);
		});
	}

	removeNotification(ID, index){
		this._notificationService.removeNotification(ID).subscribe(res => {
			this.handleNotifications();
		});
	}

	openProfile(notification){
		this.readNotification(notification);
		this._router.navigate(['/users', {outlets: {'userpage': ['userprofile', notification.notifier]}}]);
    }

}
