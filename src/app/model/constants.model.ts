import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class Constants {
  static readonly DEAFULT_COUNTRY_KEY: number = 1;
  static readonly DEFAULT_FROM_DATE: NgbDate = new NgbDate(2020, 4, 1);
  static readonly DEFAULT_TO_DATE: NgbDate = new NgbDate(2021, 5, 31);

  static readonly REPRODUCTION_FEATURES_TYPE = 'reproduction';
  static readonly UNEMPLOYMENT_FEATURES_TYPE = 'unemployment';

  static readonly REPRODUCTION_PREDICTION_KEY: string =
    'reproductionPredictions';
  static readonly UNEMPLOYMENT_PREDICTION_KEY: string =
    'unemploymentPredictions';
  static readonly SELECTED_COUNTRY_ID_KEY: string = 'selectedCountry';
  static readonly FROM_DATE_KEY: string = 'fromDate';
  static readonly TO_DATE_KEY: string = 'toDate';

  static readonly CONSTANT_FEATURES_ID: string = 'constantFeatures';
  static readonly VARIABLE_FEATURES_ID: string = 'variableFeatures';
}
