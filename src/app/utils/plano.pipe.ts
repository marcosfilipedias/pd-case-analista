import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plano'
})
export class PlanoPipe implements PipeTransform {

  transform(value: any): any {    
    switch(value){
      case 0:
        return "Starter";
      case 1:
        return "Essentials";
      case 2:
        return "Top";
    }
  }

}
