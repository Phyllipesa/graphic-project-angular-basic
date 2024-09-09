import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getGraphicInfo<T>(graphicType: string) : Observable<T>{
    return this.http.get<T>(`${this.apiUrl}${graphicType}`)
  }
}
