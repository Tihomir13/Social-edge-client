import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenMonth',
  standalone: true,
})
export class ShortenMonthPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.slice(0, 3);
  }
}
