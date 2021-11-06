import { environment as env } from './../../environments/environment';
import { VariableFeatures } from './../model/feature.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  constructor(private http: HttpClient) { }

  getConstantFeatures(country: string, endpoint = '/get_constant_data') {
    return this.http.get<Object>(env.apiUrl + country + endpoint);
  }

  getVariableFeatures(
    country: string,
    start_date: string,
    end_date: string,
    endpoint = '/get_variable_data'
  ) {
    return this.http.get<VariableFeatures>(env.apiUrl + country + endpoint, {
      params: {
        start_date: start_date,
        end_date: end_date,
      },
    });
  }
}
