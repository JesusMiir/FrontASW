import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'generateDate'})
export class GenerateDatePipe implements PipeTransform {
	transform(value):string {
		if (value != null){
            let result = '';
            result += value[8];
            result += value[9];
            result += value[7];
            result += value[5];
            result += value[6];
            result += value[4];
            result += value[0];
            result += value[1];
            result += value[2];
            result += value[3];
			return result;
		}
		else {
			return '';
		} 
	}
}