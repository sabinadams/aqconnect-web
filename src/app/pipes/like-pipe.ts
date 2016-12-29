
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'liked'})
export class LikePipe implements PipeTransform {
  transform(likeID: number, userID: number): string {
       if(likeID == userID) return 'rgb(149, 107, 185)';
  }
}