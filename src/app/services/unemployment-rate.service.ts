import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { BarChart } from '../model/bar-chart.model';
import { Prediction } from '../model/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class UnemploymentRateService {

  constructor(private http: HttpClient) {}

  getPredictions(
    country: string,
    data: Prediction,
    endpoint = '/predict_economic_personalized'
  ) {
    return this.http.post<BarChart>(env.apiUrl + country + endpoint, data);
  }
  
  getOriginalPredictions(country: string, endpoint = '/predict_economic') {
    return this.http.get<BarChart>(env.apiUrl + country + endpoint);
  }
}
