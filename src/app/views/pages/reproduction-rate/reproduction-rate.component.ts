import { Chart } from './../../../model/chart.model';
import { Country } from './../../../model/country.model';
import { SelectionModalComponent } from './../../components/selection-modal/selection-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import CHE from '../../../../assets/json/RE/CHE.json';
import FRA from '../../../../assets/json/RE/FRA.json';
import ITA from '../../../../assets/json/RE/ITA.json';
import ESP from '../../../../assets/json/RE/ESP.json';

import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reproduction-rate',
  templateUrl: './reproduction-rate.component.html',
  styleUrls: ['./reproduction-rate.component.scss'],
})
export class ReproductionRateComponent implements OnInit {
  @ViewChild('countrySelection') countrySelection: SelectionModalComponent;
  @ViewChild('periodSelection') periodSelection: SelectionModalComponent;

  chart: Chart;

  selectedPeriod: string;

  selectedCountryObject: Country;
  selectedCountry: number;

  private CHE = CHE;
  private FRA = FRA;
  private ITA = ITA;
  private ESP = ESP;

  countries: Array<Country> = [
    {
      id: 1,
      name: 'Switzerland',
      iso_code: 'CHE',
      flag: 'flag-icon flag-icon-ch',
    },
    { id: 2, name: 'Italy', iso_code: 'ITA', flag: 'flag-icon flag-icon-it' },
    { id: 3, name: 'France', iso_code: 'FRA', flag: 'flag-icon flag-icon-fr' },
    { id: 4, name: 'Spain', iso_code: 'ESP', flag: 'flag-icon flag-icon-es' },
  ];

  private hoveredDate: NgbDate | null = null;
  private fromDate: NgbDate;
  private toDate: NgbDate | null = null;

  private calendar: NgbCalendar;

  constructor(calendar: NgbCalendar) {
    this.calendar = calendar;
  }

  ngOnInit() {
    this.selectedCountryObject = this.countries[0];

    this.fromDate = new NgbDate(2020, 4, 1);
    this.toDate = new NgbDate(2021, 5, 31);

    this.selectedPeriod = '1/4/2020 - 31/5/2021';

    this.chart = new Chart();

    this.chart.y = JSON.parse(JSON.stringify(this[this.selectedCountryObject.iso_code].y));
    this.chart.xLabels = this[this.selectedCountryObject.iso_code].x;
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

      this.updateChart();
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

    this.updateChart();
  }

  private isEqual(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  private updateChart() {
    this.chart.y = JSON.parse(JSON.stringify(this[this.selectedCountryObject.iso_code].y));
    this.chart.xLabels = this[this.selectedCountryObject.iso_code].x;

    let startDate = new Date(
      this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day
    );
    let endDate = new Date(
      this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day
    );

    let startIndex = this.chart.xLabels.findIndex((currElement) =>
      this.isEqual(new Date(currElement), startDate)
    );
    let endIndex = this.chart.xLabels.findIndex((currElement) =>
      this.isEqual(new Date(currElement), endDate)
    );

    this.chart.xLabels = this.chart.xLabels.slice(startIndex, endIndex+1);
    
    this.chart.y[0].data = this.chart.y[0].data.slice(startIndex, endIndex+1);
    this.chart.y[1].data = this.chart.y[1].data.slice(startIndex, endIndex+1);
    this.chart.y[2].data = this.chart.y[2].data.slice(startIndex, endIndex+1);

  }
}
