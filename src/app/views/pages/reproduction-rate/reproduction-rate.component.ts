import { CountryDataService } from './../../../services/country-data.service';
import { ReproductionRateService } from '../../../services/reproduction-rate.service';
import { BarChart } from './../../../model/bar-chart.model';
import { BaseChartDirective } from 'ng2-charts';
import { Constants } from './../../../model/constants.model';
import { Chart } from './../../../model/chart.model';
import { Country } from './../../../model/country.model';
import { SelectionModalComponent } from './../../components/selection-modal/selection-modal.component';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { DatePipe } from '@angular/common';

/* import CHE from '../../../../assets/json/RE/CHE.json';
import FRA from '../../../../assets/json/RE/FRA.json';
import ITA from '../../../../assets/json/RE/ITA.json';
import ESP from '../../../../assets/json/RE/ESP.json'; */

import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reproduction-rate',
  templateUrl: './reproduction-rate.component.html',
  styleUrls: ['./reproduction-rate.component.scss'],
})
export class ReproductionRateComponent implements OnInit {
  @ViewChild('countrySelection') countrySelection: SelectionModalComponent;
  @ViewChild('periodSelection') periodSelection: SelectionModalComponent;
  @ViewChild('shapChart') myChart: ElementRef;

  context: CanvasRenderingContext2D;

  barChartSettings: {
    options: any;
    color: Array<any>;
    legend: boolean;
    type: string;
    height: number;
  } = {
    options: BarChart.options,
    color: BarChart.colors,
    legend: BarChart.legend,
    type: BarChart.horizontalType,
    height: BarChart.height,
  };

  chartSettings: {
    options: any;
    color: Array<any>;
    legend: boolean;
    type: string;
  } = {
    options: Chart.options,
    color: Chart.colors,
    legend: Chart.legend,
    type: Chart.type,
  };

  countries: Country[];

  chart: Chart = new Chart();
  barChart: BarChart = new BarChart();

  selectedCountryObject: Country;
  selectedCountryId: number;

  selectedPeriod: string;

  customPredictions: boolean;
  isOriginalData: boolean;

  loadingMessagePredictions: string;
  loadingMessageSHAP: string;
  loadingMessageCountries: string;
  countryLoaded: boolean = false;

  private hoveredDate: NgbDate;
  private fromDate: NgbDate;
  private toDate: NgbDate;

  constructor(
    private datePipe: DatePipe,
    private countryService: CountryDataService,
    private predictionService: ReproductionRateService
  ) {}

  ngOnInit() {
    let selectedCountryId = localStorage.getItem(
      Constants.SELECTED_COUNTRY_ID_KEY
    );
    let fromDate = localStorage.getItem(Constants.FROM_DATE_KEY);
    let toDate = localStorage.getItem(Constants.TO_DATE_KEY);

    this.selectedCountryId = selectedCountryId
      ? parseInt(selectedCountryId)
      : Constants.DEAFULT_COUNTRY_KEY;

    this.fromDate = fromDate
      ? this.convertDateToNgbDate(fromDate)
      : Constants.DEFAULT_FROM_DATE;
    this.toDate = toDate
      ? this.convertDateToNgbDate(toDate)
      : Constants.DEFAULT_TO_DATE;

    this.loadingMessageCountries = 'Loading countries...';
    this.countryService.getCountries().subscribe((countries: Country[]) => {
      this.countries = countries;
      this.loadingMessageCountries = null;
      this.countryLoaded = true;

      this.ngAfterViewInit();

      this.saveCountry(true);
      this.savePeriod(true);
    });
  }

  ngAfterViewInit() {
    const ctx = (<HTMLCanvasElement>this.myChart.nativeElement).getContext(
      '2d'
    );
    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(1, '#c0433d'); //Red
    purple_orange_gradient.addColorStop(0.4, '#f7f6c6');
    purple_orange_gradient.addColorStop(0, '#298752'); //Green

    BarChart.colors[0].backgroundColor = purple_orange_gradient;

    console.log(ctx.canvas)
  }

  public onSwitchClick() {
    if (this.isOriginalData) {
      this.isOriginalData = false;
      this.updateChart(false);
    } else {
      this.isOriginalData = true;
      this.updateChart(true);
    }
  }

  private convertDateToNgbDate(date: string | Date): NgbDate {
    let inputDate = new Date(date);
    return new NgbDate(
      inputDate.getFullYear(),
      inputDate.getMonth() + 1,
      inputDate.getDate()
    );
  }

  private loadPredictions(forceOriginal = false): boolean {
    let predictionsString = localStorage.getItem(
      Constants.REPRODUCTION_PREDICTION_KEY + this.selectedCountryObject.iso_code
    );
    if (predictionsString && !forceOriginal) {
      this.chart = JSON.parse(predictionsString);
      this.isOriginalData = false;
      return true;
    }
    this.isOriginalData = true;
    return false;
  }

  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  public isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  public isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  public saveCountry(result: boolean) {
    if (result) {
      this.selectedCountryObject = this.countries.find(
        (el) => el.id == this.selectedCountryId
      );

      localStorage.setItem(
        Constants.SELECTED_COUNTRY_ID_KEY,
        this.selectedCountryId.toString()
      );

      this.barChart = new BarChart();

      this.loadingMessageSHAP = 'Fetching SHAP values...';

      this.predictionService
        .getSHAPValues(this.selectedCountryObject.iso_code)
        .subscribe((barChart) => {
          this.barChart.x = barChart.x;
          this.barChart.y = [{ data: barChart.y[0].data }];

          this.loadingMessageSHAP = null;
        });

      this.updateChart();
    }
  }

  public savePeriod(result: boolean) {
    this.selectedPeriod =
      this.formatDate(this.getStartDate(), 'dd/MM/yyyy') +
      ' - ' +
      this.formatDate(this.getEndDate(), 'dd/MM/yyyy');

    localStorage.setItem(Constants.FROM_DATE_KEY, this.getStartDate());
    localStorage.setItem(Constants.TO_DATE_KEY, this.getEndDate());

    this.updateChart();
  }

  private isEqual(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  public formatDate(date: string | Date, format = 'yyyy-MM-dd') {
    if (date) return this.datePipe.transform(new Date(date), format);
    return null;
  }

  public getStartDate() {
    return (
      this.fromDate.year +
      '-' +
      this.fromDate.month.toString().padStart(2, '0') +
      '-' +
      this.fromDate.day.toString().padStart(2, '0')
    );
  }

  public getEndDate() {
    if (this.toDate) {
      return (
        this.toDate.year +
        '-' +
        this.toDate.month.toString().padStart(2, '0') +
        '-' +
        this.toDate.day.toString().padStart(2, '0')
      );
    }
    return null;
  }

  private updateChart(forceOriginal = false) {
    if (
      localStorage.getItem(
        Constants.REPRODUCTION_PREDICTION_KEY + this.selectedCountryObject.iso_code
      )
    ) {
      this.customPredictions = true;
    }

    if (!this.loadPredictions(forceOriginal)) {
      this.chart = new Chart();

      this.loadingMessagePredictions = 'Fetching original predictions...';

      this.predictionService
        .getOriginalPredictions(this.selectedCountryObject.iso_code, {
          start_date: this.getStartDate(),
          end_date: this.getEndDate(),
        })
        .subscribe((originalPredictions: Chart) => {
          this.chart = originalPredictions;

          this.loadingMessagePredictions = null;
        });
    }
  }
}
