import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static isGreaterThanZero(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    if (value !== null && value > 0) {
      return null;
    } else {
      return { greaterThanZero: true };
    }
  }
}
