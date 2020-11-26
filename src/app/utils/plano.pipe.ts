import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plano'
})
export class PlanoPipe implements PipeTransform {

  transform(value: any): any {    
    switch(value){
      case 0:
        return "STARTER";
      case 1:
        return "ESSENTIALS";
      case 2:
        return "TOP";
    }
  }

}
