import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const demographicValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const total_population_all = control.get('total_population_all').value;
  const total_population_below_1 = control.get(
    'total_population_below_1'
  ).value;
  const total_population_1_to_4 = control.get('total_population_1_to_4').value;
  const total_population_5_to_14 = control.get(
    'total_population_5_to_14'
  ).value;
  const total_population_15_to_24 = control.get(
    'total_population_15_to_24'
  ).value;
  const total_population_25_to_34 = control.get(
    'total_population_25_to_34'
  ).value;
  const total_population_35_to_54 = control.get(
    'total_population_35_to_54'
  ).value;
  const total_population_55_to_74 = control.get(
    'total_population_55_to_74'
  ).value;
  const total_population_above_75 = control.get(
    'total_population_above_75'
  ).value;

  if (
    parseInt(total_population_all) !=
    parseInt(total_population_below_1) +
      parseInt(total_population_1_to_4) +
      parseInt(total_population_5_to_14) +
      parseInt(total_population_15_to_24) +
      parseInt(total_population_25_to_34) +
      parseInt(total_population_35_to_54) +
      parseInt(total_population_55_to_74) +
      parseInt(total_population_above_75)
  ) {
    console.log(parseInt(total_population_all));
    console.log(parseInt(total_population_below_1));
    console.log(parseInt(total_population_1_to_4));
    console.log(parseInt(total_population_5_to_14));
    console.log(parseInt(total_population_15_to_24));
    console.log(parseInt(total_population_25_to_34));
    console.log(parseInt(total_population_35_to_54));
    console.log(parseInt(total_population_55_to_74));
    console.log(parseInt(total_population_above_75));
    return {
      sumError: true,
    };
  }

  return null;
};
