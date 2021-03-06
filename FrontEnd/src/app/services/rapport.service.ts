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
    let body = new HttpParams();
    body = body.set('id', id);
    return this._http.post(`${this.url}/getrep`, body);
  }
  getallrep() {
    return this._http.get(`${this.url}/allreports2`);
  }
  sendr(a) {
    const json = JSON.stringify(a);
    let body = new HttpParams();
    body = body.set('json', json);

    return this._http.post<any>(`${this.url}/rating`, body);
  }
  getrating() {
    return this._http.get(`${this.url}/getrating`);
  }
  getmoyrating() {
    return this._http.get(`${this.url}/moyrating`);
  }
}
