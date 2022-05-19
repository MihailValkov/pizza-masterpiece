import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLength',
})
export class TextLengthPipe implements PipeTransform {
  transform(value: string, length: number): string {
    return value.length > length ? value.slice(0, length) + '...' : value;
  }
}
