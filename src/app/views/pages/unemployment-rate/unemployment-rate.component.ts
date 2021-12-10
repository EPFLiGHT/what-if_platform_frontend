import { UnemploymentRateService } from './../../../services/unemployment-rate.service';
import { CountryDataService } from './../../../services/country-data.service';
import { BarChart } from './../../../model/bar-chart.model';
import { Constants } from './../../../model/constants.model';
import { Chart } from './../../../model/chart.model';
import { Country } from './../../../model/country.model';
import { SelectionModalComponent } from './../../components/selection-modal/selection-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unemployment-rate',
  templateUrl: './unemployment-rate.component.html',
  styleUrls: ['./unemployment-rate.component.scss'],
})
export class UnemploymentRateComponent implements OnInit {
  @ViewChild('countrySelection') countrySelection: SelectionModalComponent;

  barChart: BarChart = new BarChart();

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      type: 'linear',
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true, // minimum value will be 0.
          },
        },
      ],
    },
  };

  public barChartType = 'bar';
  public barChartLegend = true;

  countries: Country[];

  selectedCountryObject: Country;
  selectedCountryId: number;

  customPredictions: boolean;
  isOriginalData: boolean;

  loadingMessagePredictions: string;
  loadingMessageCountries: string;
  countryLoaded: boolean = false;

  private fromDate: NgbDate = Constants.DEFAULT_FROM_DATE;
  private toDate: NgbDate = Constants.DEFAULT_TO_DATE;

  constructor(
    private datePipe: DatePipe,
    private countryService: CountryDataService,
    private predictionService: UnemploymentRateService
  ) {}

  ngOnInit() {
    let selectedCountryId = localStorage.getItem(
      Constants.SELECTED_COUNTRY_ID_KEY
    );

    this.selectedCountryId = selectedCountryId
      ? parseInt(selectedCountryId)
      : Constants.DEAFULT_COUNTRY_KEY;

    this.loadingMessageCountries = 'Loading countries...';
    this.countryService.getCountries().subscribe((countries: Country[]) => {
      this.countries = countries;
      this.loadingMessageCountries = null;
      this.countryLoaded = true;

      this.saveCountry(true);
    });
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

  private loadPredictions(forceOriginal = false): boolean {
    let predictionsString = localStorage.getItem(
      Constants.UNEMPLOYMENT_PREDICTION_KEY +
        this.selectedCountryObject.iso_code
    );
    if (predictionsString && !forceOriginal) {
      this.barChart = JSON.parse(predictionsString);
      this.isOriginalData = false;
      return true;
    }
    this.isOriginalData = true;
    return false;
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

      this.updateChart();
    }
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
        Constants.UNEMPLOYMENT_PREDICTION_KEY +
          this.selectedCountryObject.iso_code
      )
    ) {
      this.customPredictions = true;
    }

    if (!this.loadPredictions(forceOriginal)) {
      this.barChart = new BarChart();

      this.loadingMessagePredictions = 'Fetching original predictions...';

      this.predictionService
        .getOriginalPredictions(this.selectedCountryObject.iso_code)
        .subscribe((originalPredictions: BarChart) => {
          this.barChart = originalPredictions;

          this.loadingMessagePredictions = null;
        });
    }
  }
}
