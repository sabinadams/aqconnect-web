import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content-service';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.css']
})
export class CalculatorPage implements OnInit{
	items:any;
	selectedtype:any;
	itemtype = 'armors';
	selecteditems = [];
	results = [];
	showResults = false;
	filtertype = "alpha";
	level = 0;
	base_stats:any;
	constructor( private _router: Router, private _contentService: ContentService ){}
	ngOnInit(){
		this._contentService.getCalculatorContent().subscribe(res => {
			this.items = res;
			this.base_stats = res.base_stats;
			this.selectedtype = res[this.itemtype];
		});
		this.results['attack'] = 0;
		this.results['defense'] = 0;
		this.results['mana'] = 0;
		this.results['health'] = 0;
		this.results['dodge'] = 0;
		this.results['crit'] = 0;
		this.results['crit_power'] = 0;
		this.results['hit'] = 0;
		this.results['skill_one'] = 0;
		this.results['skill_two'] = 0;
		this.results['skill_three'] = 0;
		this.results['skill_four'] = 0;
	}
	changeListener($event){
		this.changeItemType($event.target.value);
	}
	changeItemType(type){
		this.itemtype = type;
		this.selectedtype = this.items[type];

	}
	selectItem(item){
		this._contentService.getItemByID(item.ID).subscribe(res => {
			this.results[this.itemtype] = res;
			if( res.attack ) {this.results['attack'] += res.attack;}
			if( res.defense ) {this.results['defense'] += res.defense;}
			if( res.mana ) {this.results['mana'] += res.mana;}
			if( res.health ) {this.results['health'] += res.health;}
			if( res.dodge ) {this.results['dodge'] += res.dodge;}
			if( res.crit ) {this.results['crit'] += res.crit;}
			if( res.crit_power ) {this.results['crit_power'] += res.crit_power;}
			if( res.hit ) {this.results['hit'] += res.hit;}
			if( res.skill_one ) {this.results['skill_one'] = res.skill_one;}
			if( res.skill_two ) {this.results['skill_two'] = res.skill_two;}
			if( res.skill_three ) {this.results['skill_three'] = res.skill_three;}
			if( res.skill_four) {this.results['skill_four'] = res.skill_one;}
		});
		this.selecteditems[this.itemtype] = item;
		this.items[this.itemtype]  = [];
		this.selectedtype = [];
		this.selectedtype.push(item);
		this.items[this.itemtype].push(item);
	}

	hideResults(){
		let index = this.level - 1;	
		if(index >= 0){
			this.results['attack'] -= this.base_stats[index].attack;
			this.results['defense'] -= this.base_stats[index].defense;
			this.results['mana'] -= this.base_stats[index].mana;
			this.results['health'] -= this.base_stats[index].health;
		}
		this.showResults = false;
	}

	restart(){
		this.level = 0;
		this.items = [];
		this.results = [];
		this.selectedtype = [];
		this.selecteditems = [];
		this.showResults = false;
		this._contentService.getCalculatorContent().subscribe(res => {
			this.itemtype = 'armors';
			this.items = res;
			this.selectedtype = res[this.itemtype];
			this.selecteditems = [];
			this.results['attack'] = 0;
			this.results['defense'] = 0;
			this.results['mana'] = 0;
			this.results['health'] = 0;
			this.results['dodge'] = 0;
			this.results['crit'] = 0;
			this.results['crit_power'] = 0;
			this.results['hit'] = 0;
			this.results['skill_one'] = 0;
			this.results['skill_two'] = 0;
			this.results['skill_three'] = 0;
			this.results['skill_four'] = 0;
		});
	}
	resetField(){
		if(this.selecteditems[this.itemtype]){
			this._contentService.getCalculatorContent().subscribe(res => {
				this.selecteditems[this.itemtype] = null;
				this.items[this.itemtype] = res[this.itemtype];
				this.selectedtype = res[this.itemtype];
				this.results['attack'] -=  this.results[this.itemtype].attack;
				this.results['defense'] -=  this.results[this.itemtype].defense;
				this.results['helth'] -=  this.results[this.itemtype].helth;
				this.results['mana'] -=  this.results[this.itemtype].mana;
				this.results['hit'] -=  this.results[this.itemtype].hit;
				this.results['crit'] -=  this.results[this.itemtype].crit;
				this.results['crit_power'] -=  this.results[this.itemtype].crit_power;
				this.results['dodge'] -=  this.results[this.itemtype].dodge;
				if(this.itemtype == 'classes'){
					this.results['skill_one'] = '';
					this.results['skill_two'] = '';
					this.results['skill_three'] = '';
					this.results['skill_four'] = '';
				}
				this.results[this.itemtype] = null;
			});
		}else{
			alert(` No ${this.itemtype} selected.`)
		}
	}
	calculate(){
		let index = this.level - 1;	
		if(index >= 0){
			this.results['attack'] += this.base_stats[index].attack;
			this.results['defense'] += this.base_stats[index].defense;
			this.results['mana'] += this.base_stats[index].mana;
			this.results['health'] += this.base_stats[index].health;
		}
		this.showResults = true;	
	}
}
