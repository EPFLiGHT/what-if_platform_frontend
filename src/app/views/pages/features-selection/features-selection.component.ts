import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-selection',
  templateUrl: './features-selection.component.html',
  styleUrls: ['./features-selection.component.scss'],
})
export class FeaturesSelectionComponent implements OnInit {
  iso_code = "";
  start_date = "";
  end_date = "";
  country_name = "";

  features = {
    demographic: [
      {
        'fullName': 'Total population',
        'name': 'total_population_all',
        'default': 40,
        'value': 40,
        'range': [0, 2000000000]
      },
      {
        'fullName': 'Total population under 1 years old',
        'name': 'total_population_below_1',
        'default': 40,
        'value': 40,
        'range': [0, 2000000000]
      },
    ]
  }



  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.iso_code = params['country'];
    });

    this.route.queryParams.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.country_name = params['country_name'];
    });
  }

  changeValue(featureCategory, featureName, event) {
    let value = event.target.value;
    let category = `${ featureCategory }`
    this.features[category].find(el => el.name == featureName)['value'] = value;
    console.log(this.features);
  }
}
