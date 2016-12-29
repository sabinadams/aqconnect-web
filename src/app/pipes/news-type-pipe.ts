import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'newsType'})
export class NewsTypePipe implements PipeTransform {
  transform(type: number, option?: string): string {
    var color:any;
    var typeName:any;
    switch (type) {
            case 1: 
                color = '#3db76f';
                typeName = 'Updates';
                break;
            case 2: 
                color = '#c34444';
                typeName = 'Tips/Guides';
                break;
            case 3: 
                color = '#b7c12c';
                typeName = 'Content Updates';
                break;
            case 4: 
                color = '#b055e6';
                typeName = 'App Updates';
                break;
            case 5: 
                color = '#e09e49';
                typeName = '#fff';
                break;
            default:
                color = '#fff';
                typeName = 'Call To Action';
        }
    
    if(option == 'color'){
        return color;
    }else {
        return typeName;
    }
  }
}