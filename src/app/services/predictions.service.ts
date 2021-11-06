import { Chart } from './../model/chart.model';
import { Prediction } from './../model/prediction.model';
import { environment as env } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  constructor(private http: HttpClient) { }

  getPredictions(country: string, data : Prediction, endpoint="/predict_personalized") {
    return this.http.post<Chart>(env.apiUrl + country + endpoint, data);
  }
}
