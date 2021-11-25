import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  public url: string;
  constructor(private _http: HttpClient) { 
    this.url = "http://127.0.0.1:8000";
  }


}
