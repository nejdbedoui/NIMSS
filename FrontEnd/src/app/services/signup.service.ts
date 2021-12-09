import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public url: string;
  identity: String;
  token: any;
  constructor(private _http: HttpClient) {
    this.url = "http://127.0.0.1:8000";
  }
  create(report){
    console.log('hh',report);
    const json 	= JSON.stringify(report);
    let body = new HttpParams()
    .set('json', json);

    return this._http.post<any>(`${this.url}/signup`,body);
  }

  getToken(){
		this.token = JSON.parse(localStorage.getItem('token'));

		return this.token;
	}
}
