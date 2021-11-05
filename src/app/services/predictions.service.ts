import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  private url: string = "http://localhost:105/api/v1/";

  constructor(private http: HttpClient) { }

  getPredictions(country, data, endpoint="/predict_personalized") {
    return this.http.post<Object>(this.url + country + endpoint, data);
  }
}
