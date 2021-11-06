import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class Constants {
    static readonly DEAFULT_COUNTRY_KEY: number = 1
    static readonly DEFAULT_FROM_DATE: NgbDate = new NgbDate(2020, 4, 1);
    static readonly DEFAULT_TO_DATE: NgbDate = new NgbDate(2021, 5, 31);

    static readonly PREDICTION_KEY: string = "predictions"
    static readonly SELECTED_COUNTRY_ID_KEY: string = "selectedCountry"
    static readonly FROM_DATE_KEY: string = "fromDate"
    static readonly TO_DATE_KEY: string = "toDate"
}
