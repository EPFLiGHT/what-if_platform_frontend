import { Observable } from 'rxjs';
import { Constants } from './../model/constants.model';
import { environment as env } from './../../environments/environment';
import { VariableFeatures } from './../model/feature.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../model/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  constructor(private http: HttpClient) {}

  // `endpoint` must not have the slash because the request is without a parameter (otherwise you got two slashes)
  getCountries(endpoint = 'get_countries') {
    return this.http.get<Country[]>(env.apiUrl + endpoint);
  }

  getConstantFeatures(country: string, endpoint = '/get_constant_data') {
    let savedData = localStorage.getItem(
      Constants.CONSTANT_FEATURES_ID + country
    );
    if (savedData) {
      return new Observable<Object>((observer) => {
        observer.next(JSON.parse(savedData));
      });
    } else {
      let data = this.http.get<Object>(env.apiUrl + country + endpoint);

      return data;
    }
  }

  getVariableFeatures(
    country: string,
    start_date: string,
    end_date: string,
    endpoint = '/get_variable_data'
  ) {
    let savedData = localStorage.getItem(
      Constants.VARIABLE_FEATURES_ID + country
    );
    if (savedData) {
      return new Observable<VariableFeatures>((observer) => {
        observer.next(JSON.parse(savedData));
      });
    } else {
      let data = this.http.get<VariableFeatures>(
        env.apiUrl + country + endpoint,
        {
          params: {
            start_date: start_date,
            end_date: end_date,
          },
        }
      );

      return data;
    }
  }
}
