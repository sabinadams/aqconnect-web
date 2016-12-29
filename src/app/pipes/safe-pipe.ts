import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(data, option?:string) {

  	switch(option){
  		case 'url':
  			return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  		case 'html':
  			return this.sanitizer.bypassSecurityTrustHtml(data);
  	}
  }
} 