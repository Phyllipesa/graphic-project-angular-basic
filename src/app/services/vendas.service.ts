import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../_models/Data';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private apiUrl = 'http://localhost:3000/toPie'

  constructor(private http: HttpClient) { }

  getGraphic() : Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl)
  }
}
