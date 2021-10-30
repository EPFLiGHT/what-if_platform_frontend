import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  private url: string = "http://localhost:105/api/v1/CHE/predict";

  constructor(private http: HttpClient) { }

  getPredictions() {
    return this.http.post<Object>(this.url, {'start_date': '2020-04-01', 'end_date': '2020-05-01'});
  }
}
