import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFixed',
})
export class DecimalFixedPipe implements PipeTransform {
  transform(value: number, point: number = 2): string {
    return value.toFixed(point);
  }
}
