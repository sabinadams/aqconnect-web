import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, term: any): any {
    if( term == "" || term === null || term === undefined ) return items;
    return items.filter(function(item){
    	if(item.name.toString().indexOf(term) !== -1 || item.name.toString().toLowerCase().includes(term.toLowerCase())){
    		return item;
    	}
    })
  }

}