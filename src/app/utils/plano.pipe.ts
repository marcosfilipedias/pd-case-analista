import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plano'
})
export class PlanoPipe implements PipeTransform {
  transform(value: any): any {    
    switch(value){
      case 0: case "STARTER":
        return "Starter";
      case 1: case "ESSENTIALS":
        return "Essentials";
      case 2: case "TOP":
        return "Top";
    }
  }
}
