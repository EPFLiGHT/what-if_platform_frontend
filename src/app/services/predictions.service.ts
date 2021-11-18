import { BarChart } from './../model/bar-chart.model';
import { Chart } from './../model/chart.model';
import { Prediction } from './../model/prediction.model';
import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  constructor(private http: HttpClient) {}

  getPredictions(
    country: string,
    data: Prediction,
    endpoint = '/predict_personalized'
  ) {
    return this.http.post<Chart>(env.apiUrl + country + endpoint, data);
  }

  getOriginalPredictions(
    country: string,
    dates: { start_date: string; end_date: string },
    endpoint = '/predict'
  ) {
    return this.http.post<Chart>(env.apiUrl + country + endpoint, dates);
  }

  getSHAPValues(country: string, endpoint = '/get_shap_values') {
    return this.http.get<BarChart>(env.apiUrl + country + endpoint);
  }
}
