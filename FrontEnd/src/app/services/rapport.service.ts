import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = "http://127.0.0.1:8000";
  }


  createReport(report) {
    const json = JSON.stringify(report);
    let body = new HttpParams();
    body = body.set('json', json);

    return this._http.post<any>(`${this.url}/newR`, body);
  }
  getrep(id) {
    return this._http.get(`${this.url}/allreports/${id}`);
  }
  getallrep() {
    return this._http.get(`${this.url}/allreports2`);
  }
}
