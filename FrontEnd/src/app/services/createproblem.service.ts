import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateproblemService {

  public url: string
  
  constructor(private _http: HttpClient) {
    this.url = "http://127.0.0.1:8000/newC";
   }
  create(compl){
    const json 	= JSON.stringify(compl);
    let body = new HttpParams();
    body = body.set('json', json);
    
    return this._http.post<any>(this.url,body);
  }
}
