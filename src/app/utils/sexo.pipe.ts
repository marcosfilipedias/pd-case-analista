import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch(value){
      case 'F': 
        return "Feminino";
      case 'M': 
        return "Masculino";
    }
  }

}
