import { Injectable } from '@angular/core';

@Injectable()
export class ArrayUtilityService {
  removeElemById(array: any[], index: number): any[] {
    return array.filter((_, i) => i !== index);
  }
}
