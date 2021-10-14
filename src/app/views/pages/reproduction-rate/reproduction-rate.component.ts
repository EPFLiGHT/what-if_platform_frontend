import { Country } from './../../../model/country.model';
import { SelectionModalComponent } from './../../components/selection-modal/selection-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reproduction-rate',
  templateUrl: './reproduction-rate.component.html',
  styleUrls: ['./reproduction-rate.component.scss'],
})
export class ReproductionRateComponent implements OnInit {
  @ViewChild('countrySelection') countrySelection: SelectionModalComponent;
  @ViewChild('periodSelection') periodSelection: SelectionModalComponent;

  selectedPeriod: string;

  selectedCountryObject: Country;
  selectedCountry: number;

  countries = [
    { id: 1, name: 'Switzerland', flag: 'flag-icon flag-icon-ch' },
    { id: 2, name: 'Italy', flag: 'flag-icon flag-icon-it' },
    { id: 3, name: 'France', flag: 'flag-icon flag-icon-fr' },
    { id: 4, name: 'Spain', flag: 'flag-icon flag-icon-es' },
  ];

  private hoveredDate: NgbDate | null = null;
  private fromDate: NgbDate;
  private toDate: NgbDate | null = null;

  private calendar: NgbCalendar;

  constructor(calendar: NgbCalendar) {
    this.calendar = calendar;
  }

  ngOnInit() {
    this.selectedCountryObject = {
      id: 1,
      name: 'Switzerland',
      flag: 'flag-icon flag-icon-ch',
    };

    this.fromDate = new NgbDate(2020, 4, 1);
    this.toDate = this.calendar.getNext(this.fromDate, 'd', 10);

    this.selectedPeriod = '14/8/2020 - 26/8/2020';
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  saveCountry(result: boolean) {
    if (result) {
      this.selectedCountryObject = this.countries.find(
        (el) => el.id == this.selectedCountry
      );
    }
  }

  savePeriod(result: boolean) {
    this.selectedPeriod =
      this.fromDate.day +
      '/' +
      this.fromDate.month +
      '/' +
      this.fromDate.year +
      ' - ' +
      this.toDate.day +
      '/' +
      this.toDate.month +
      '/' +
      this.toDate.year;
  }
}
