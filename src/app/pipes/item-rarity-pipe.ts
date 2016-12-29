// **********************************************************************************************************
// * Options:                                                                                    
// *        rare_color   <- Used to find color associated with rarity
// *        font_color   <- Used to find the font color that looks best with that rarity color
// * 
// **********************************************************************************************************

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'itemRarity'})
export class ItemRarityPipe implements PipeTransform {
  transform(rarity: number, option: string): string {
    var rareColor:any;
    var fontColor:any;
    switch (rarity) {
            case 1: //Common
                if(option == 'rare_color'){
                    rareColor = "#d4d4d4"
                }else{
                    rareColor = "black";
                }
                fontColor = 'black';
                break;
            case 2: //Uncommon
                rareColor = '#11ad30';
                fontColor = '#fff';
                break;
            case 3: //Rare
                rareColor = '#006ece';
                fontColor = '#fff';
                break;
            case 4: //Epic
                rareColor = '#8e11ad';
                fontColor = '#fff';
                break;
            case 5: //Legendary
                rareColor = '#e09e04';
                fontColor = '#fff';
                break;
            default:
               if(option == 'rare_color'){
                    rareColor = "#d4d4d4"
                }else{
                    rareColor = "black";
                }
                fontColor = 'black';
        }
    
    if(option == 'rare_color' || option == 'calc_color'){
        return rareColor;
    }else {
        return fontColor;
    }
  }
}