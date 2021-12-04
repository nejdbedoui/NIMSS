import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  public url: string;
  identity: String;


  constructor(private _http: HttpClient) {
    this.url = "https://127.0.0.1:8000";

   }
   getAll(){
    return this._http.get(`${this.url}/extractor`);
  }
  getList(id){
    return this._http.get(`${this.url}/extractor1/${id}`);
  }

  create(compl){
    const json 	= JSON.stringify(compl);
    let body = new HttpParams();
    body = body.set('json', json);

    return this._http.post<any>(`${this.url}/newC`,body);
  }

  getType(){
    return this._http.get(`${this.url}/dashboard`);
  }
  login(user){
    const json     = JSON.stringify(user);
    let body = new HttpParams();
    body = body.set('json', json);

    return this._http.post<any>(`${this.url}/login`,body);

  }
  getIdentity(){
    this.identity = JSON.parse(localStorage.getItem('identity'));

    return this.identity;
  }
  deleteprob(id){
    return this._http.get(`${this.url}/supp/${id}`);
  }
  getProblem(id){
    return this._http.get<any>(`${this.url}/detail/${id}`);

  }
  updateProblem(problem){
    const json     = JSON.stringify(problem[0][0]);
    let body = new HttpParams()
    .set('json', json);
    return this._http.post<any>(`${this.url}/update`,body);

  }

  createReport(report){
    const json 	= JSON.stringify(report);
    let body = new HttpParams();
    body = body.set('json', json);
    return this._http.post<any>(`${this.url}/newR`,body);
  }
}
