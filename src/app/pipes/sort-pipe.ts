import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  
  transform(items: any, term: any): any {
  	if(items && items.length > 1){
  		if(term == 'alpha' || term == undefined){
  			return items.sort(this.GetSortOrder('name'));
  		}else{
    		return items.sort(this.GetSortOrder(term)).reverse();
  		}

  	}else{
  		return items;
  	}
  }

}