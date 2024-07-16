import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(date: Date): string {

    if(date === null){
      return 'Em Andamento';
    }
    const convertDate: moment.Moment = moment(date);

    return convertDate.format('DD/MM/YYYY');
  }

}
