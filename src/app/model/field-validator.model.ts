import { ValidatorFn } from '@angular/forms';
export class FieldValidator {
  validator: ValidatorFn;
  errors: Array<{ name: string; message: string }>;
}
