import { Constants } from './../../../model/constants.model';
import { Prediction } from './../../../model/prediction.model';
import { PredictionsService } from './../../../services/predictions.service';
import { CountryDataService } from './../../../services/country-data.service';
import { Feature, VariableFeatures } from './../../../model/feature.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-features-selection',
  templateUrl: './features-selection.component.html',
  styleUrls: ['./features-selection.component.scss'],
})
export class FeaturesSelectionComponent implements OnInit {
  pageNumber: number = 1;
  isPage: Array<boolean> = [true, false, false];
  dates: Array<string> = [];

  isoCode = '';
  startDate = '';
  endDate = '';
  countryName = '';

  features: {
    demographic: Feature[];
    sanitary: Feature[];
    unemployment: Feature[];
    gdp: Feature[];
    policies: Feature[];
  } = {
    demographic: [
      {
        fullName: 'Total population',
        name: 'total_population_all',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population under 1 years old',
        name: 'total_population_below_1',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population between 1 and 4 years old',
        name: 'total_population_1_to_4',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population between 5 and 14 years old',
        name: 'total_population_5_to_14',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population between 15 and 24 years old',
        name: 'total_population_15_to_24',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population between 25 and 34 years old',
        name: 'total_population_25_to_34',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population between 35 and 54 years old',
        name: 'total_population_35_to_54',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population between 55 and 74 years old',
        name: 'total_population_55_to_74',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Total population above 75 years old',
        name: 'total_population_above_75',
        value: 40,
        range: [0, 2000000000],
      },
      {
        fullName: 'Population percentage over 60 years old',
        name: 'population_percentage_over_60',
        value: 10,
        range: [0, 100],
      },
    ],
    sanitary: [
      {
        fullName: 'Number of hospital beds per 1000 people',
        name: 'hospital_beds_per_1000',
        value: 10,
        range: [0, 15],
      },
      {
        fullName: 'Number of physicians per 1000 people',
        name: 'physicians_per_1000',
        value: 10,
        range: [0, 15],
      },
      {
        fullName: 'Number of nurses per 1000 people',
        name: 'nurses_per_1000',
        value: 10,
        range: [0, 20],
      },
    ],
    unemployment: [
      {
        fullName: 'Unemployment rate (31/03/2019)',
        name: 'unemployment_rate_2019_03_31',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (30/06/2019)',
        name: 'unemployment_rate_2019_06_30',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (30/09/2019)',
        name: 'unemployment_rate_2019_09_30',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (31/12/2019)',
        name: 'unemployment_rate_2019_12_31',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (31/03/2020)',
        name: 'unemployment_rate_2020_03_31',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (30/06/2020)',
        name: 'unemployment_rate_2020_06_30',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (30/09/2020)',
        name: 'unemployment_rate_2020_09_30',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (31/12/2020)',
        name: 'unemployment_rate_2020_12_31',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (31/03/2021)',
        name: 'unemployment_rate_2021_03_31',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (30/06/2021)',
        name: 'unemployment_rate_2021_06_30',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (30/09/2021)',
        name: 'unemployment_rate_2021_09_30',
        value: 40,
        range: [0, 100],
      },
      {
        fullName: 'Unemployment rate (31/12/2021 - forecast)',
        name: 'unemployment_rate_2021_12_31',
        value: 40,
        range: [0, 100],
      },
    ],
    gdp: [
      {
        fullName: 'GDP (31/03/2019)',
        name: 'gdp_2019_03_31',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (30/06/2019)',
        name: 'gdp_2019_06_30',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (30/09/2019)',
        name: 'gdp_2019_09_30',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (31/12/2019)',
        name: 'gdp_2019_12_31',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (31/03/2020)',
        name: 'gdp_2020_03_31',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (30/06/2020)',
        name: 'gdp_2020_06_30',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (30/09/2020)',
        name: 'gdp_2020_09_30',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (31/12/2020)',
        name: 'gdp_2020_12_31',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (31/03/2021)',
        name: 'gdp_2021_03_31',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (30/06/2021)',
        name: 'gdp_2021_06_30',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (30/09/2021)',
        name: 'gdp_2021_09_30',
        value: 40,
        range: [0, 100000],
      },
      {
        fullName: 'GDP (31/12/2021 - forecast)',
        name: 'gdp_2021_12_31',
        value: 40,
        range: [0, 100000],
      },
    ],
    policies: [
      {
        fullName: 'School closing',
        name: 'school_closing',
        value: [1, 2, 3],
        range: [0, 3],
      },
      {
        fullName: 'Workplace closing',
        name: 'workplace_closing',
        value: [1, 2, 3],
        range: [0, 3],
      },
      {
        fullName: 'Canceling public events',
        name: 'cancel_public_events',
        value: [1, 2, 3],
        range: [0, 2],
      },
      {
        fullName: 'Restrictions on gatherings size',
        name: 'restrictions_on_gatherings',
        value: [1, 2, 3],
        range: [0, 4],
      },
      {
        fullName: 'Closing public transports',
        name: 'close_public_transport',
        value: [1, 2, 3],
        range: [0, 2],
      },
      {
        fullName: 'Stay at home requirements',
        name: 'stay_at_home_requirements',
        value: [1, 2, 3],
        range: [0, 3],
      },
      {
        fullName: 'Contact tracing',
        name: 'contact_tracing',
        value: [1, 2, 3],
        range: [0, 2],
      },
      {
        fullName: 'Restrictions on internal movement',
        name: 'restrictions_on_internal_movement',
        value: [1, 2, 3],
        range: [0, 2],
      },
      {
        fullName: 'International travelling controls',
        name: 'international_travel_controls',
        value: [1, 2, 3],
        range: [0, 4],
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private countryDataService: CountryDataService,
    private predictionsService: PredictionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isoCode = params['country'];
      this.countryDataService
        .getConstantFeatures(this.isoCode)
        .subscribe((data) => {
          Object.keys(data).forEach((featureName) => {
            Object.keys(this.features).forEach((category) => {
              this.changeSingleFeature(
                category,
                featureName,
                data[featureName]
              );
            });
          });
        });

      this.route.queryParams.subscribe((params) => {
        this.startDate = params['start_date'];
        this.endDate = params['end_date'];
        this.countryName = params['country_name'];

        this.countryDataService
          .getVariableFeatures(this.isoCode, this.startDate, this.endDate)
          .subscribe((data: VariableFeatures) => {
            this.dates = data.dates;

            Object.keys(data.policies).forEach((feature) => {
              this.changeSingleFeature(
                'policies',
                feature,
                data.policies[feature]
              );
            });
          });
      });
    });
  }

  private changeSingleFeature(category: string, name: string, value: string) {
    let feature = this.features[category].find(
      (el: Feature) => el.name == name
    );
    if (feature) {
      feature['value'] = value;
    }
  }

  public changePage(pageNumber: number) {
    for (let i = 0; i < this.isPage.length; i++) {
      this.isPage[i] = false;
    }

    this.isPage[pageNumber - 1] = true;
  }

  public predict() {
    let constantFeatures: Object = {};

    Object.keys(this.features).forEach((category) => {
      if (category != 'policies') {
        constantFeatures = {
          ...constantFeatures,
          ...this.features[category].reduce(
            (obj: string, item: Feature) =>
              Object.assign(obj, { [item.name]: item.value }),
            {}
          ),
        };
      }
    });

    let variableFeatures: Object = this.features['policies'].reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.value }),
      {}
    );

    let data: Prediction = {
      start_date: this.startDate,
      end_date: this.endDate,
      features: {
        constant: constantFeatures,
        variable: variableFeatures,
      },
    };

    console.log(data);

    this.predictionsService
      .getPredictions(this.isoCode, data)
      .subscribe((result) => {
        console.log(result);
        localStorage.setItem(Constants.PREDICTION_KEY, JSON.stringify(result));
        this.router.navigate(['/reproduction-rate']);
      });
  }
}
