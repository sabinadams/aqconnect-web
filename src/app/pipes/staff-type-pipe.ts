// **********************************************************************************************************
// * Options:																					
// *		name_color
// *		job_title
// * Examples:
// *	    <h2 [ngStyle]="{'color':member?.access_level | staffType:'name_color'}"></h2>   get name color
// *	    <h2> {{member?.access_level | staffType:'job_title'}} </h2>                     get job title
// *
// **********************************************************************************************************


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'staffType'})
export class StaffTypePipe implements PipeTransform {
  transform(access_level: number, option: string): string {
   	var jobTitle: string;
   	var nameColor: string;
    switch (access_level){
    	case 1:
    		jobTitle = "Moderator";
    		nameColor = "#55e014"
    		break;
    	case 2:
    		jobTitle = "Content";
    		nameColor = "#0aa9ea";
    		break;
    	case 3:
    		jobTitle = "News Team";
    		nameColor = "#ff26cc"
    		break;
    	case 4:
    		jobTitle = "Security Tester";
    		nameColor = "#ac2840";
    		break;
    	case 5:
    		jobTitle = "Developer";
    		nameColor = "#d2bb00";
    		break;
    	default:
    		jobTitle = "AQConnect Staff";
    		nameColor = "#fff";
    		break;
    }
    
    if(option == 'job_title'){
    	return jobTitle;
    }else {
    	return nameColor;
    }
  }
}